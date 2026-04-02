import ActionButton from "@/components/ActionButton";
import TimelineItem from "@/components/applications/detail/TimelineItem";
import ApplicationNotes from "@/components/applications/detail/ApplicationNotes";
import DocumentItem from "@/components/applications/detail/DocumentItem";
import { Edit3, RefreshCw, Plus, FileText } from "lucide-react";
import { getApplicationById } from "@/app/lib/actions";
import { notFound } from "next/navigation";

interface ApplicationDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ApplicationDetailPage({ params }: ApplicationDetailPageProps) {
  const { id } = await params;
  const application = await getApplicationById(id);

  if (!application) {
    notFound();
  }

  const status = String(application.status || "sent").toLowerCase();
  const statusLabel =
    status === "interview"
      ? "Interview Stage"
      : status === "offer"
      ? "Offer"
      : status === "rejected"
      ? "Rejected"
      : "Sent";

  const statusClassName =
    status === "interview"
      ? "bg-status-interview-bg text-status-interview-text"
      : status === "offer"
      ? "bg-status-offer-bg text-status-offer-text"
      : status === "rejected"
      ? "bg-status-rejected-bg text-status-rejected-text"
      : "bg-on-surface/10 text-on-surface/70";

  const appliedLabel = application.created_at
    ? new Date(application.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Unknown date";

  return (
    <div className="p-10 max-w-360 mx-auto bg-surface min-h-screen">
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <span className={`${statusClassName} text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm`}>
              {statusLabel}
            </span>
            <span className="text-[10px] font-bold text-on-surface/30 uppercase tracking-widest">
              Applied {appliedLabel}
            </span>
          </div>
          <h1 className="text-8xl font-extrabold text-on-surface tracking-tightest leading-none">
            {application.company || "Unknown Company"}
          </h1>
          <p className="text-2xl font-bold text-on-surface/40 mt-4 tracking-tight">
            Application Detail
          </p>
        </div>

        <div className="flex gap-4">
          <ActionButton label="Edit Application" variant="secondary" icon={Edit3} />
          <ActionButton label="Change Status" variant="primary" icon={RefreshCw} />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-8 bg-surface-bright rounded-4xl p-12">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-[10px] font-extrabold text-on-surface/20 uppercase tracking-widest">Application Journey</h3>
            <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:brightness-125 cursor-pointer">
              Add Milestone
            </button>
          </div>

          <div className="space-y-2">
            <TimelineItem
              date={appliedLabel}
              title="Application Sent"
              description="Application created in your tracker."
              isActive
              isLast
            />
          </div>
        </div>

        <div className="col-span-4 space-y-10">
          <ApplicationNotes />

          <div className="bg-surface-container-low/30 p-8 rounded-4xl">
            <div className="flex items-center gap-3 mb-8 text-primary">
              <FileText className="w-4 h-4" />
              <h3 className="text-[10px] font-extrabold uppercase tracking-widest">Documents</h3>
            </div>

            <div className="space-y-3 mb-8">
              {application.cv_url ? (
                <DocumentItem name="CV Uploaded" date={appliedLabel} />
              ) : (
                <p className="text-xs text-on-surface/40">No documents uploaded yet.</p>
              )}
            </div>

            <button className="w-full border-2 border-dashed border-primary/10 rounded-2xl p-5 text-[10px] font-extrabold text-primary/40 uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-surface-container-low transition-all cursor-pointer group">
              <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Upload New File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
