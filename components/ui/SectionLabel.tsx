import { Text } from "react-native";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <Text
      className={`text-text-secondary text-[13px] font-medium mt-3 mb-1.5 uppercase tracking-[0.5] ${className}`}
    >
      {children}
    </Text>
  );
}
