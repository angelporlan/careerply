import FormInput from "@/components/applications/new/FormInput";
import FileUpload from "@/components/applications/new/FileUpload";
import InfoCard from "@/components/applications/new/InfoCard";
import { Link, Lightbulb, Info } from "lucide-react";

export default function NewApplicationPage() {
  return (
    <div className="p-10 max-w-[1200px] mx-auto bg-surface min-h-screen">
      <h2 className="text-primary font-bold mb-8 tracking-tight">Job Tracker</h2>

      <div className="grid grid-cols-12 gap-12 items-start">
        {/* COLUMNA IZQUIERDA: Formulario */}
        <div className="col-span-8 bg-surface-container-lowest rounded-4xl p-12 shadow-sm">
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-on-surface tracking-tightest">New Application</h1>
            <p className="text-on-surface/40 font-medium mt-1">Add a new opportunity to your curated workspace.</p>
          </div>

          <form className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <FormInput label="Company Name" placeholder="e.g. Acme Corp" />
              <FormInput label="Job Title" placeholder="e.g. Senior Product Designer" />
            </div>

            <FormInput 
              label="Job URL/Link" 
              placeholder="https://linkedin.com/jobs/..." 
              icon={<Link className="w-4 h-4" />}
            />

            <div className="grid grid-cols-2 gap-6">
              <FormInput label="Application Date" placeholder="dd/mm/aaaa" type="date" />
              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-extrabold text-on-surface/40 tracking-widest uppercase px-1">Status</label>
                 <select className="w-full p-4 rounded-xl bg-surface-container-low border-none text-sm text-on-surface outline-none shadow-inner">
                    <option>Sent</option>
                    <option>Interview</option>
                    <option>Offer</option>
                 </select>
              </div>
            </div>

            <FileUpload />

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-extrabold text-on-surface/40 tracking-widest uppercase px-1">Notes</label>
              <textarea 
                rows={4}
                placeholder="Salary expectations, key contacts..."
                className="w-full p-4 rounded-xl bg-surface-container-low border-none text-sm text-on-surface outline-none shadow-inner resize-none"
              />
            </div>

            <div className="flex justify-end items-center gap-6 pt-6">
              <button type="button" className="text-on-surface/40 font-bold text-sm hover:text-on-surface transition-colors cursor-pointer">
                Cancel
              </button>
              <button type="submit" className="bg-primary-gradient text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:brightness-110 transition-all cursor-pointer">
                Save Application
              </button>
            </div>
          </form>
        </div>

        {/* COLUMNA DERECHA: Info Sidebars */}
        <div className="col-span-4 space-y-6">
          <InfoCard title="Pro Tip" icon={<Lightbulb className="w-4 h-4 text-primary" />}>
            Personalize your CV for each application to increase interview chances by up to 40%. The Curator will track which version you used.
          </InfoCard>
          
          <InfoCard title="Status Guide" icon={<Info className="w-4 h-4 text-on-surface/40" />}>
            <ul className="space-y-3 mt-2">
              <li className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-on-surface/20" /> Sent
              </li>
              <li className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-primary" /> Interview
              </li>
              <li className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-status-offer-text">
                <div className="w-2 h-2 rounded-full bg-status-offer-text" /> Offer
              </li>
            </ul>
          </InfoCard>
        </div>
      </div>
    </div>
  );
}