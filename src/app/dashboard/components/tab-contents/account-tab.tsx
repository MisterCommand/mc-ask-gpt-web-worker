import { UpgradeToPlusSection } from "../upgrade-to-plus-section";
import { DangerZoneCard } from "../danger-zone-card";

export function AccountTab() {
  return (
    <div className="space-y-6">
      <UpgradeToPlusSection
        price={8}
        currency="$"
        period="month"
      />
      <DangerZoneCard />
    </div>
  );
} 