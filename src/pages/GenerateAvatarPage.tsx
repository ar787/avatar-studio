import { useCallback, useRef, useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { PageHeader } from '@/components/PageHeader';
import { useAppSelector } from '@/store/hooks';
import { selectIsAuthenticated } from '@/store/auth/authSelectors';
import { selectUserProfile } from '@/store/user/userSelectors';
import { useAvatarGeneration } from '@/components/AvatarCreation/hooks/useAvatarGeneration';
import { AVATAR_STYLES } from '@/components/AvatarCreation/avatarStyles';
import { Panel } from '@/components/GenerateAvatar/Panel';
import { StyleCard } from '@/components/GenerateAvatar/StyleCard';
import { ResultsGrid } from '@/components/GenerateAvatar/ResultsGrid';
import { PromptField } from '@/components/GenerateAvatar/PromptField';
import { GenerateButton } from '@/components/GenerateAvatar/GenerateButton';
import type { AvatarStyle } from '@/types/avatar';

export default function GenerateAvatarPage() {
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const [promptKey, setPromptKey] = useState(0);
  const [hasPrompt, setHasPrompt] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<AvatarStyle>('none');
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const profile = useAppSelector(selectUserProfile);
  const { loading, progress, previews, onGenerate } = useAvatarGeneration();

  const hasCredits = (profile && profile.credits > 0) ?? false;
  const disabled = (isAuthenticated && !hasPrompt) || loading;

  const getTooltipTitle = useCallback(() => {
    if (!isAuthenticated) return 'Sign in to generate';
    if (!hasCredits) {
      return 'Insufficient credits';
    }
    return '';
  }, [hasCredits, isAuthenticated]);

  const handleGenerate = () => {
    const prompt = promptRef.current?.value ?? '';
    onGenerate(prompt, selectedStyle).finally(() => {
      setPromptKey((key) => key + 1);
      setHasPrompt(false);
    });
  };
  return (
    <Box>
      <PageHeader title="Generate your avatar" />
      <Typography variant="caption" color="text.secondary" sx={{ mb: 3 }}>
        Write a prompt, pick a style, and review your results — all in one
        place.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' },
          gap: 3,
        }}
      >
        <Panel step="01" label="Prompt" title="Describe your avatar">
          <PromptField
            key={promptKey}
            ref={promptRef}
            onHasValueChange={setHasPrompt}
          />
        </Panel>

        <Panel step="02" label="Settings" title="Choose a style">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 1.5,
            }}
          >
            {AVATAR_STYLES.map((style) => (
              <StyleCard
                key={style.value}
                label={style.label}
                description={style.description}
                emoji={style.emoji}
                selected={selectedStyle === style.value}
                onSelect={() => setSelectedStyle(style.value)}
              />
            ))}
          </Box>
        </Panel>

        <Panel step="03" label="Result" title="Your generated avatars">
          <GenerateButton
            disabled={disabled}
            loading={loading}
            progress={progress}
            tooltipTitle={getTooltipTitle()}
            onClick={handleGenerate}
          />

          <ResultsGrid
            previews={previews}
            loading={loading}
            hasCredits={hasCredits}
          />
        </Panel>
      </Box>
    </Box>
  );
}
