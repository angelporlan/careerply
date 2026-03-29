interface StatusBadgeProps {
  status: 'SENT' | 'INTERVIEW' | 'OFFER' | 'REJECTED';
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    SENT: "bg-status-sent-bg text-status-sent-text",
    INTERVIEW: "bg-status-interview-bg text-status-interview-text",
    OFFER: "bg-status-offer-bg text-status-offer-text",
    REJECTED: "bg-status-rejected-bg text-status-rejected-text",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${styles[status]}`}>
      {status}
    </span>
  );
}