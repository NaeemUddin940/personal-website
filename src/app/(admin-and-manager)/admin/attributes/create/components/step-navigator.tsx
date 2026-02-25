import { Button } from "@/components/ui/button";

interface StepNavigatorProps {
  openTab: string;
  tabs: string[];
  onFinalSubmit: () => void;
  isSubmitting?: boolean;
}

export const StepNavigator: React.FC<StepNavigatorProps> = ({
  openTab,
  tabs,
  validateAndSwitchTab,
  onFinalSubmit,
  isSubmitting = false,
}) => {
  const activeTabIndex = tabs.indexOf(openTab);
  const isFirstStep = activeTabIndex === 0;
  const isLastStep = activeTabIndex === tabs.length - 1;

  const handleNext = (e: React.MouseEvent) => {
    if (isLastStep) {
      e.preventDefault();
      const res = validateAndSwitchTab(tabs[activeTabIndex]);
      if (res) {
        onFinalSubmit();
      }
    } else {
      e.preventDefault();
      const nextTab = tabs[activeTabIndex + 1];
      validateAndSwitchTab(nextTab);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isFirstStep) {
      const prevTab = tabs[activeTabIndex - 1];
      validateAndSwitchTab(prevTab);
    }
  };
  return (
    <div className="flex justify-end gap-3">
      {!isFirstStep && (
        <Button type="button" variant="outline" onClick={handlePrev}>
          Previous
        </Button>
      )}

      <Button
        variant="primary"
        // শুধুমাত্র লাস্ট স্টেপে টাইপ submit হবে, বাকি সময় button
        type={isLastStep ? "submit" : "button"}
        isLoading={isSubmitting}
        onClick={handleNext}
      >
        {isLastStep ? "Create Attribute" : "Next"}
      </Button>
    </div>
  );
};
