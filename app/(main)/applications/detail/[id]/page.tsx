import ActionButton from "@/components/ActionButton";
import TimelineItem from "@/components/applications/detail/TimelineItem";
import ApplicationNotes from "@/components/applications/detail/ApplicationNotes";
import DocumentItem from "@/components/applications/detail/DocumentItem";
import { Edit3, RefreshCw, FileText } from "lucide-react";
import { getApplicationById, uploadApplicationCv } from "@/app/lib/actions";
import { notFound } from "next/navigation";
import CvUploadDropzone from "@/components/applications/detail/CvUploadDropzone";

interface ApplicationDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; success?: string }>;
}

export default async function ApplicationDetailPage({ params, searchParams }: ApplicationDetailPageProps) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  const application = await getApplicationById(id);
  const uploadCvAction = uploadApplicationCv.bind(null, id);

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

  const getRelativeTimeLabel = (dateValue?: string | null) => {
    if (!dateValue) return "unknown";

    const now = Date.now();
    const timestamp = new Date(dateValue).getTime();

    if (Number.isNaN(timestamp)) {
      return "unknown";
    }

    const diffMinutes = Math.max(0, Math.floor((now - timestamp) / 60000));

    if (diffMinutes < 1) return "just now";
    if (diffMinutes < 60) return `${diffMinutes} min ago`;

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  };

  const lastSavedLabel = getRelativeTimeLabel(application.updated_at || application.created_at);

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
          <ApplicationNotes
            initialNotes={application.notes}
            lastSavedAtLabel={lastSavedLabel}
          />

          <div className="bg-surface-container-low/30 p-8 rounded-4xl">
            <div className="flex items-center gap-3 mb-8 text-primary">
              <FileText className="w-4 h-4" />
              <h3 className="text-[10px] font-extrabold uppercase tracking-widest">Documents</h3>
            </div>

            {resolvedSearchParams.error ? (
              <p className="mb-4 text-xs text-status-rejected-text bg-status-rejected-bg/40 rounded-xl px-3 py-2">
                {resolvedSearchParams.error}
              </p>
            ) : null}

            {resolvedSearchParams.success ? (
              <p className="mb-4 text-xs text-status-offer-text bg-status-offer-bg/40 rounded-xl px-3 py-2">
                CV uploaded successfully.
              </p>
            ) : null}

            <div className="space-y-3 mb-8">
              {application.cv_url ? (
                <DocumentItem name="CV Uploaded" date={appliedLabel} href={application.cv_url} />
              ) : (
                <p className="text-xs text-on-surface/40">No documents uploaded yet.</p>
              )}
            </div>

            {!application.cv_url ? <CvUploadDropzone uploadAction={uploadCvAction} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
