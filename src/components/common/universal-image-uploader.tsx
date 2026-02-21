"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, CloudUpload, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";

/**
 * TypeScript Interfaces
 */
interface UploaderStatus {
  success: boolean;
  action: string;
  message: string;
  status: number;
}

interface ImageItem {
  id: string;
  file: File | null;
  preview: string | null;
}

type VariantType = "avatar" | "medium" | "large" | "extra-large";

interface ImageUploaderProps {
  variant?: VariantType;
  label?: string;
  maxFile?: number;
  maxFileSize?: number; // MB
  acceptedTypes?: string[];
  className?: string; // Wrapper container (width control)
  boxClassName?: string; // Individual box styles
  onImagesChange?: (files: (File | null)[]) => void;
}

export const UniversalImageUploader: React.FC<ImageUploaderProps> = ({
  variant = "large",
  label = "",
  maxFile = 5,
  maxFileSize = 2,
  acceptedTypes = ["image/jpeg", "image/png", "image/webp"],
  className = "",
  boxClassName = "",
  onImagesChange,
}) => {
  const [images, setImages] = useState<ImageItem[]>([
    { id: crypto.randomUUID(), file: null, preview: null },
  ]);
  const [status, setStatus] = useState<UploaderStatus | null>(null);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const showStatus = (
    success: boolean,
    action: string,
    message: string,
    statusCode = 200,
  ) => {
    setStatus({ success, action, message, status: statusCode });
    if (success) {
      setTimeout(() => setStatus(null), 3000);
    }
  };

  const handleFile = useCallback(
    async (file: File | undefined, id: string) => {
      // async add kora hoyeche
      if (!file) return;

      // 1. Type Validation
      if (!acceptedTypes.includes(file.type)) {
        showStatus(
          false,
          "INVALID_TYPE",
          "🚫 Sudhu JPG, PNG ebong WebP allowed.",
          400,
        );
        return;
      }

      // 2. Size Validation (Apnar custom error format onujayi)
      if (file.size > maxFileSize * 1024 * 1024) {
        showStatus({
          success: false,
          action: "LIMIT_FILE_SIZE",
          message: `📏 File is too large. Max limit is ${maxFileSize}MB.`,
          status: 400,
        });
        return;
      }

      try {
        // --- BUFFER GENERATION ---
        // Modern way: file.arrayBuffer() bebohar kore
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);

        // Preview-er jonno amader ekhono Base64 ba URL dorkar
        const previewUrl = URL.createObjectURL(file);

        setImages((prev) => {
          const currentUploadedCount = prev.filter(
            (img) => img.file !== null,
          ).length;
          const targetImage = prev.find((img) => img.id === id);
          const isNewUpload = targetImage && targetImage.file === null;

          if (isNewUpload && currentUploadedCount >= maxFile) {
            showStatus(
              false,
              "MAX_LIMIT_REACHED",
              `⚠️ Apni maximum ${maxFile} ti image upload korte parben.`,
              400,
            );
            return prev;
          }

          // Object-e 'buffer' property-ti add kora hoyeche
          const newImages = prev.map((img) =>
            img.id === id
              ? { ...img, file, preview: previewUrl, buffer: buffer }
              : img,
          );

          const updatedUploadedCount = newImages.filter(
            (img) => img.file !== null,
          ).length;
          const hasEmptyBox = newImages.some((img) => img.file === null);

          if (maxFile > 1 && updatedUploadedCount < maxFile && !hasEmptyBox) {
            newImages.push({
              id: crypto.randomUUID(),
              file: null,
              preview: null,
              buffer: null,
            });
          }

          if (onImagesChange) {
            // Ekhone file-er poriborte buffer pathate chaile:
            onImagesChange(newImages.map((img) => img.buffer).filter(Boolean));
          }

          return newImages;
        });

        console.log("Generated Buffer:", buffer);

        showStatus(
          true,
          "UPLOAD_SUCCESS",
          "✅ Image successfully converted to Buffer!",
          200,
        );
      } catch (error) {
        console.error("Buffer error:", error);
        showStatus(
          false,
          "ERROR",
          "❌ File process korte somoshya hoyeche.",
          500,
        );
      }
    },
    [acceptedTypes, maxFileSize, maxFile, onImagesChange],
  );

  const removeImage = (id: string) => {
    setImages((prev) => {
      const newImages = prev.filter((img) => img.id !== id);
      const hasEmptyBox = newImages.some((img) => img.file === null);
      if (
        newImages.length === 0 ||
        (!hasEmptyBox && newImages.length < maxFile)
      ) {
        newImages.push({ id: crypto.randomUUID(), file: null, preview: null });
      }
      if (onImagesChange) onImagesChange(newImages.map((img) => img.file));
      return newImages;
    });
    showStatus(true, "REMOVE_IMAGE", "🗑️ Image remove kora hoyeche.", 200);
  };

  const getVariantStyles = () => {
    const hasRounded = boxClassName?.includes("rounded");
    const baseRounding = hasRounded ? "" : "rounded-2xl";

    switch (variant) {
      case "avatar":
        return cn(
          "w-32 h-32 md:w-50 md:h-50 rounded-full",
          baseRounding,
          boxClassName,
        );
      case "medium":
        return cn("w-32 h-32 md:w-50 md:h-50", baseRounding, boxClassName);
      case "large":
        return cn(
          "w-48 h-48 md:w-56 md:h-56 lg:w-100 lg:h-73",
          baseRounding,
          boxClassName,
        );
      case "extra-large":
        return cn(
          "w-full aspect-[21/9] md:aspect-[21/8]",
          baseRounding,
          boxClassName,
        );
      default:
        return cn("w-48 h-48", baseRounding, boxClassName);
    }
  };

  const gridLayoutClass =
    variant === "extra-large" ? "flex flex-col" : "flex flex-wrap";

  return (
    <div className={`inline-flex flex-col max-w-full font-sans ${className}`}>
      {/* Label & Stats - Ekhon wrapper size onujayi thakbe */}
      <div className="flex items-center justify-between mb-3 px-1 w-full overflow-hidden">
        {label && (
          <label className="text-sm font-bold text-foreground opacity-80 truncate mr-2">
            {label}
          </label>
        )}

        {images.filter((i) => i.file).length > 1 && (
          <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 bg-muted text-muted-foreground rounded-full border border-border">
            {images.filter((i) => i.file).length} / {maxFile}
          </span>
        )}
      </div>

      {/* Grid Wrapper */}
      <div className={`${gridLayoutClass} gap-4`}>
        <AnimatePresence mode="popLayout">
          {images.map((img) => {
            const boxStyles = getVariantStyles();

            return (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`relative group border-2 ${variant === "avatar" ? "rounded-full" : ""} transition-all duration-300 shadow-sm shrink-0
                  ${boxStyles}
                  ${
                    !img.preview
                      ? "border-dashed border-border bg-input hover:border-primary"
                      : "border-solid border-border bg-card"
                  }`}
              >
                {!img.preview ? (
                  <div
                    onClick={() => fileInputRefs.current[img.id]?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      handleFile(e.dataTransfer.files[0], img.id);
                    }}
                    className="w-full h-full flex flex-col items-center justify-center cursor-pointer p-2 text-center"
                  >
                    <div className="rounded-full bg-primary/10 border border-primary/20 shadow-sm flex items-center justify-center mb-2 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20 w-10 h-10 md:w-12 md:h-12">
                      <CloudUpload className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>

                    <div className="text-center px-2 space-y-1">
                      <span className="block font-semibold text-foreground text-[11px] md:text-xs">
                        {variant === "avatar" && "Avatar Image (1:1 ratio)"}
                        {variant === "medium" && "Common Image (1:1 ratio)"}
                        {variant === "large" && "Display Image (4:3 or 1:1)"}
                        {variant === "extra-large" &&
                          "Banner Image (21:9 wide)"}
                      </span>

                      {variant !== "avatar" && (
                        <span className="block text-muted-foreground text-[10px] md:text-xs">
                          Recommended: High quality • JPG, PNG, WebP
                        </span>
                      )}

                      <span className="block text-muted-foreground text-[10px] md:text-xs">
                        Max {maxFileSize}MB per image
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full  h-full relative group">
                    <Image
                      height={400}
                      width={400}
                      src={img.preview}
                      alt="Uploaded Item"
                      className={`w-full ${variant === "avatar" ? "rounded-full" : ""} h-full object-cover transition-transform duration-500 group-hover:scale-105`}
                    />

                    <div
                      className={`absolute inset-0 ${variant === "avatar" ? "rounded-full" : ""} bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 md:gap-3 backdrop-blur-[2px]`}
                    >
                      <button
                        type="button"
                        onClick={() => fileInputRefs.current[img.id]?.click()}
                        className="p-1.5 md:p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 border border-white/30 transition-all hover:scale-110"
                      >
                        <Upload size={variant === "small" ? 14 : 18} />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeImage(img.id)}
                        className="p-1.5 md:p-2.5 bg-destructive rounded-full text-white hover:scale-110 shadow-lg transition-all"
                      >
                        <Trash2 size={variant === "small" ? 14 : 18} />
                      </button>
                    </div>
                  </div>
                )}

                <input
                  type="file"
                  ref={(el) => (fileInputRefs.current[img.id] = el)}
                  className="hidden"
                  accept={acceptedTypes.join(",")}
                  onChange={(e) => handleFile(e.target.files?.[0], img.id)}
                />
                {variant === "avatar" && (
                  <div className="absolute bottom-2 right-2 z-60 h-10 w-10 bg-primary flex items-center justify-center rounded-full text-white border-3 border-background shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:border-primary group-hover:border-dashed">
                    <Camera size={16} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Status Feedback */}
      {/* <div className="min-h-10 w-full">
        <AnimatePresence>
          {status && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mt-2 flex items-center gap-2 p-2 px-3 rounded-lg border text-[10px] md:text-xs font-semibold w-full
                ${
                  status.success
                    ? "bg-green-500/10 border-green-500/20 text-green-600"
                    : "bg-destructive/10 border-destructive/20 text-destructive"
                }`}
            >
              {status.success ? (
                <CheckCircle2 size={14} />
              ) : (
                <AlertCircle size={14} />
              )}
              {status.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div> */}
    </div>
  );
};
