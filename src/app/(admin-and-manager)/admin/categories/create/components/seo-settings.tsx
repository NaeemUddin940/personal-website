"use client";
import Input from "@/components/common/input";
import { SectionHeader } from "@/components/common/section-header";
import { Card } from "@/components/ui/card";
import { Option, Select } from "@/components/ui/select";
import { motion } from "framer-motion";
import { HiOutlineDocumentText } from "react-icons/hi";
export default function SeoSettings({ formData, setFormData }) {
  return (
    <motion.div
      key="step2"
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 80, opacity: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
    >
      <Card className="p-6">
        <SectionHeader
          title="Search Engine Optimization"
          subtitle="Control how this category appears in search results"
          icon={HiOutlineDocumentText}
        />
        <div className="space-y-5 grid grid-cols-2 gap-5">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-card-foreground mb-4">
              SEO Basic and Important Details
            </h4>
            <Input
              label="Meta Title"
              name="metaTitle"
              required
              value={formData.seo.metaTitle}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  seo: { ...formData.seo, metaTitle: e.target.value },
                })
              }
              placeholder="SEO-optimized title"
            />

            <Input
              label="Meta Description"
              name="canonicalUrl"
              required
              value={formData.seo.canonicalUrl}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  seo: { ...formData.seo, canonicalUrl: e.target.value },
                })
              }
              placeholder="Concise description for search engines (max 160 chars)"
            />

            <Input
              label="Meta Keywords"
              name="metaDescription"
              required
              value={formData.seo.metaKeywords}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  seo: { ...formData.seo, metaKeywords: e.target.value },
                })
              }
              placeholder="keyword1, keyword2, keyword3"
            />
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-card-foreground mb-4">
              Open Graph (Social Sharing)
            </h4>
            <Input
              label="OG Title"
              name="ogTitle"
              required
              value={formData.seo.ogTitle}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  seo: { ...formData.seo, ogTitle: e.target.value },
                })
              }
              placeholder="Title for social media shares"
            />
            <Input
              label="OG Description"
              name="ogDescription"
              required
              value={formData.seo.ogDescription}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  seo: { ...formData.seo, ogDescription: e.target.value },
                })
              }
              placeholder="Description for social media shares"
            />
            <Input
              label="OG Image URL"
              name="ogImage"
              required
              value={formData.seo.ogImage}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  seo: { ...formData.seo, ogImage: e.target.value },
                })
              }
              placeholder="https://example.com/og-image.jpg"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <Input
            label="Canonical URL"
            name="metaDescription"
            required
            value={formData.seo.metaKeywords}
            onChange={(e) =>
              setFormData({
                ...formData,
                seo: { ...formData.seo, metaKeywords: e.target.value },
              })
            }
            placeholder="https://example.com/canonical-url"
          />

          <Select
            label="Robots Directive"
            name="robots"
            value={formData.seo.robots}
            onChange={(value) =>
              setFormData({
                ...formData,
                seo: { ...formData.seo, robots: value },
              })
            }
          >
            <Option value="index,follow">index, follow</Option>
            <Option value="noindex,follow">noindex, follow</Option>
            <Option value="index,nofollow">index, nofollow</Option>
            <Option value="noindex,nofollow">noindex, nofollow</Option>
          </Select>
        </div>
      </Card>
    </motion.div>
  );
}
