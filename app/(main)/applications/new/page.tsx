"use client";

import FormInput from "@/components/applications/new/FormInput";
import FileUpload from "@/components/applications/new/FileUpload";
import InfoCard from "@/components/applications/new/InfoCard";
import { Link, Lightbulb, Info } from "lucide-react";
import FormSelect from "@/components/applications/new/FormSelect";
import FormTextArea from "@/components/applications/new/FormTextArea";
import ActionButton from "@/components/ActionButton";

export default function NewApplicationPage() {
    return (
        <div className="p-10 max-w-[1200px] mx-auto bg-surface min-h-screen">

            <div className="mb-10">
                <h1 className="text-4xl font-extrabold text-on-surface tracking-tightest">New Application</h1>
                <p className="text-on-surface/40 font-medium mt-1">Add a new opportunity to your curated workspace.</p>
            </div>

            <div className="grid grid-cols-12 gap-12 items-start">
                {/* COLUMNA IZQUIERDA: Formulario */}
                <div className="col-span-8 bg-surface-container-lowest rounded-4xl p-12 shadow-sm">


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
                            <FormSelect
                                label="Status"
                                defaultValue="sent"
                                options={[
                                    { label: "Sent", value: "sent" },
                                    { label: "Interview", value: "interview" },
                                    { label: "Offer", value: "offer" },
                                    { label: "Rejected", value: "rejected" }
                                ]}
                                onChange={(val) => console.log("Nuevo estado:", val)}
                            />
                        </div>

                        <FileUpload />

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-extrabold text-on-surface/40 tracking-widest uppercase px-1">Notes</label>
                            <FormTextArea
                                label=""
                                placeholder="Salary expectations, key contacts, or preparation notes..."
                                rows={5}
                                onChange={(val) => console.log("Notas actualizadas:", val)}
                            />
                        </div>

                        <div className="flex justify-end items-center pt-6">
                            <ActionButton
                                label="Cancel"
                                variant="ghost"
                                href="/applications"
                            />

                            <ActionButton
                                label="Save Application"
                                type="submit"
                            />

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
                            <li className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-status-rejected-text">
                                <div className="w-2 h-2 rounded-full bg-status-rejected-text" /> Rejected
                            </li>
                        </ul>
                    </InfoCard>
                </div>
            </div>
        </div>
    );
}