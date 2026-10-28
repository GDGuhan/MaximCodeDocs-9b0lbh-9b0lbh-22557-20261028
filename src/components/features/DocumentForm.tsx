import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { generateDocumentData } from "@/lib/documentUtils";
import { Sparkles, FileText, Award } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  domain: z.string().min(1, "Please select a domain"),
  role: z.string().min(2, "Role must be at least 2 characters"),
  internship: z.string().min(2, "Internship name is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
}).refine((d) => new Date(d.endDate) > new Date(d.startDate), {
  message: "End date must be after start date",
  path: ["endDate"],
});

const DOMAINS = [
  "Web Development",
  "App Development",
  "Python",
  "Digital Marketing",
  "AI/ML",
];

const ROLES: Record<string, string[]> = {
  "Web Development": ["Frontend Developer Intern", "Full Stack Developer Intern", "React Developer Intern", "UI Developer Intern"],
  "App Development": ["Flutter Developer Intern", "Mobile App Developer Intern", "Android Developer Intern", "iOS Developer Intern"],
  "Python": ["Python Developer Intern", "Backend Developer Intern", "Automation Engineer Intern", "Software Developer Intern"],
  "Digital Marketing": ["Digital Marketing Intern", "SEO Analyst Intern", "Social Media Marketing Intern", "Content Marketing Intern"],
  "AI/ML": ["Machine Learning Intern", "AI Engineer Intern", "Data Analyst Intern", "Data Science Intern"],
};

export default function DocumentForm() {
  const navigate = useNavigate();
  const [selectedDomain, setSelectedDomain] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      domain: "",
      role: "",
      internship: "",
      startDate: "",
      endDate: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const docData = generateDocumentData(values);
    sessionStorage.setItem("maximcode_doc", JSON.stringify(docData));
    toast.success("Documents generated successfully!");
    navigate("/preview");
  }

  const currentRoles = ROLES[selectedDomain] || [];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-[hsl(220,20%,88%)] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[hsl(225,60%,20%)] to-[hsl(220,80%,35%)] p-8 text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[hsl(43,90%,65%)]" />
            </div>
            <span className="text-sm font-medium text-white/80 uppercase tracking-widest">Maxim Code</span>
          </div>
          <h2 className="text-2xl font-bold certificate-font mb-1">Generate Documents</h2>
          <p className="text-white/70 text-sm body-font">Fill in the details to generate professional internship documents</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[hsl(225,60%,20%)] font-semibold">Intern Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Arjun Sharma"
                        className="h-11 border-[hsl(220,20%,82%)] focus:border-[hsl(225,60%,20%)] focus:ring-[hsl(225,60%,20%)]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Domain */}
              <FormField
                control={form.control}
                name="domain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[hsl(225,60%,20%)] font-semibold">Domain / Department</FormLabel>
                    <Select
                      onValueChange={(val) => {
                        field.onChange(val);
                        setSelectedDomain(val);
                        form.setValue("role", "");
                        form.setValue("internship", val + " Internship");
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-11 border-[hsl(220,20%,82%)]">
                          <SelectValue placeholder="Select domain" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {DOMAINS.map((d) => (
                          <SelectItem key={d} value={d}>{d}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Role */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[hsl(225,60%,20%)] font-semibold">Role / Position</FormLabel>
                    {currentRoles.length > 0 ? (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11 border-[hsl(220,20%,82%)]">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {currentRoles.map((r) => (
                            <SelectItem key={r} value={r}>{r}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <FormControl>
                        <Input
                          placeholder="e.g., Software Development Intern"
                          className="h-11 border-[hsl(220,20%,82%)]"
                          {...field}
                        />
                      </FormControl>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Internship */}
              <FormField
                control={form.control}
                name="internship"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[hsl(225,60%,20%)] font-semibold">Internship / Course Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Web Development Internship"
                        className="h-11 border-[hsl(220,20%,82%)]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[hsl(225,60%,20%)] font-semibold">Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" className="h-11 border-[hsl(220,20%,82%)]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[hsl(225,60%,20%)] font-semibold">End Date</FormLabel>
                      <FormControl>
                        <Input type="date" className="h-11 border-[hsl(220,20%,82%)]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-[hsl(225,60%,20%)] to-[hsl(220,80%,35%)] hover:from-[hsl(225,60%,25%)] hover:to-[hsl(220,80%,40%)] text-white font-semibold text-base rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Documents
              </Button>
            </form>
          </Form>
        </div>

        {/* Footer */}
        <div className="px-8 pb-6 flex items-center justify-center gap-6 text-xs text-[hsl(220,15%,55%)]">
          <div className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[hsl(43,74%,45%)]" />
            <span>Completion Certificate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-[hsl(225,60%,35%)]" />
            <span>Offer Letter</span>
          </div>
        </div>
      </div>
    </div>
  );
}
