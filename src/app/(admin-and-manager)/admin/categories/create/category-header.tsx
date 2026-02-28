"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  HiOutlineArrowLeft,
  HiOutlineSave,
  HiOutlineSparkles,
} from "react-icons/hi";
export default function CategoryHeader({
  showPreview,
  setShowPreview,
  isSubmitting,
  handleSave,
  steps,
  setCurrentStep,
  currentStep,
}: {
  showPreview: boolean;
  setShowPreview: (show: boolean) => void;
  isSubmitting: any;
  handleSave: any;
  steps: any;
  setCurrentStep: any;
  currentStep: number;
}) {
  return (
    <>
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="sticky top-0 z-10 bg-secondary backdrop-blur-xl  shadow-sm"
      >
        <div className="max-w-7xl mx-auto py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                variant="outline"
                icon={<HiOutlineArrowLeft className="w-5 h-5" />}
              />
              <div>
                <h1 className="text-2xl font-bold text-secondary-foreground leading-tight">
                  Create New Category
                </h1>
                <p className="text-xs text-muted-foreground">
                  Fill in the details below to add a category
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPreview(!showPreview)}
                className={`hidden sm:flex px-4 py-2 rounded-lg transition-colors items-center gap-2 text-sm font-medium border ${
                  showPreview
                    ? "bg-violet-50 text-violet-700 border-violet-200"
                    : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                }`}
              >
                <HiOutlineSparkles className="w-4 h-4" />
                <span>{showPreview ? "Hide Preview" : "Preview"}</span>
              </motion.button>
              <Button
                icon={<HiOutlineSave className="w-4 h-4" />}
                isLoading={isSubmitting}
                variant="primary"
              >
                <span>{isSubmitting ? "Saving..." : "Save"}</span>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
