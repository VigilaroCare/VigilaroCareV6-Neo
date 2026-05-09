import React from "react";
import NeoIcon from './NeoIcon';

/**
 * Smart Icon Logic
 * Escolhe a biblioteca baseada no contexto
 */

export default function IconSmart({ name, size = 26, color = "#333" }) {

  // Regras por semântica
  const technicalIcons = ["gas-cylinder", "propane-tank", "electricity", "hazardous-materials"];
  const emotionalIcons = ["baby", "dog", "elderly", "home-heart"];
  const navigationIcons = ["home", "scan", "settings", "profile", "book"];

  if (technicalIcons.includes(name)) {
    return <NeoIcon name={name} size={size} color={color} />;
  }

  if (emotionalIcons.includes(name)) {
    return <NeoIcon name="Happyemoji" size={size} color={color} />;
  }

  if (navigationIcons.includes(name)) {
    return <NeoIcon name={`${name}-outline`} size={size} color={color} />;
  }

  // fallback: Ionicons
  return <NeoIcon name="InfoCircle" size={size} color={color} />;
}
