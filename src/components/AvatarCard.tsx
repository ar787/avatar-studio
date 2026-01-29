import {
  Card,
  CardActionArea,
  CardMedia,
  type CardMediaProps,
} from "@mui/material";
import type { AvatarType } from "../types/avatar";
import React from "react";

type AvatarCardProps = {
  avatar: AvatarType;
  onClick: (name: AvatarType) => void;
  name: string;
};

function AvatarCard({ avatar, name, onClick }: Readonly<AvatarCardProps>) {
  const handleOnClick = () => {
    onClick(avatar);
  };

  const onContextMenu: CardMediaProps["onContextMenu"] = (e) => {
    e.preventDefault();
  };

  return (
    <Card variant="elevation" sx={{  borderRadius: "16px" }}>
      <CardActionArea
        onClick={handleOnClick}
        tabIndex={0}
        aria-label={`Open avatar ${avatar.name}`}
      >
        <CardMedia
          component="img"
          src={avatar.imageUrl}
          alt={name}
          sizes="20"
          onContextMenu={onContextMenu}
        />
      </CardActionArea>
    </Card>
  );
}

export default React.memo(AvatarCard);
