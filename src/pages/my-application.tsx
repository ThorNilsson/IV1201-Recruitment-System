import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { translations } from "../../languages/translations";
import LoadingPage from "../Components/LoadingPage";
import NoAccess from "../Components/NoAccessPage";
import { api } from "../utils/api";
import Login from "./login";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const formButtonStyle = "text-lg bg-gray-800 p-2 rounded";
const formInputNumberStyle = "bg-gray-700 p-1 rounded w-14";
const formInputTextStyle = "bg-gray-700 p-1 rounded";

export default function MyApplication() {
  /* React State */
  const [editing, setEditing] = React.useState(false);
  const [competences, setCompetences] = React.useState<{ c: string; y: number }[]>([]);
  const [availability, setAvailability] = React.useState<{ f: Date; t: Date }[]>([]);

  /* Translations */
  const { locale } = useRouter();
  const text = translations[locale || "en_US"]?.myApplicationPage;

  /* Session */
  const { data: session } = useSession();

  /* Queries */
  const { data: applicaiton } = api.applicant.getApplication.useQuery();
  const { data: competencesList } = api.applicant.getCompetences.useQuery({ lang: locale || "en_US" });

  /* Mutations */

  /* Views */
  if (!text || session === undefined || !applicaiton) return <LoadingPage />;

  if (session?.user?.image !== "applicant") return <NoAccess />;

  if (!session?.user) return <Login />;

  let statusColor = "";
  switch (applicaiton.status) {
    case "INCOMPLETE":
      statusColor = "bg-yellow-700";
      break;
    case "UNHANDLED":
      statusColor = "bg-gray-700";
      break;
    case "ACCEPTED":
      statusColor = "bg-green-700";
      break;
    case "REJECTED":
      statusColor = "bg-red-700";
      break;
  }

  return (
    <div className="flex flex-col space-y-7 items-center justify-center min-h-full text-white">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">{text.title}</h1>
      <p className={`p-4 text-lg rounded ${statusColor}`}>
        {text.applicationStatusKey} {text.applicationStatus[applicaiton.status]}
      </p>
      {applicaiton.status === "INCOMPLETE" ? <p className="p-4 rounded bg-blue-700">{text.incompletePrompt}</p> : null}
      <p>
        {applicaiton.name} {applicaiton.surname} | {applicaiton.pnr} | {applicaiton.email}
      </p>
      <div className="p-4 bg-purple-700 rounded">
        {editing ? (
          <form>
            <h3 className="text-xl">{text.competences}</h3>
            <>
              {competences.map((c, i) => (
                <p key={`${c.c}${i}`} className="flex gap-3 items-center">
                  {text.competence}:
                  <select
                    className={formInputTextStyle}
                    value={c.c}
                    onChange={(e) => {
                      c.c = e.target.value; /* cursed React code */
                      setCompetences(competences.map((q) => q));
                    }}
                  >
                    {competencesList?.map((cl, i) => (
                      <option
                        key={`${cl.competence_name[0]?.name || "?"}${i}`}
                        value={cl.competence_name[0]?.name || "?"}
                      >
                        {cl.competence_name[0]?.name || "?"}
                      </option>
                    ))}
                  </select>
                  {text.years}:
                  <input
                    className={formInputNumberStyle}
                    type="number"
                    min={0}
                    max={100}
                    value={c.y}
                    onChange={(e) => {
                      c.y = parseInt(e.target.value);
                      setCompetences(competences.map((q) => q));
                    }}
                  />
                  <button
                    className={formButtonStyle}
                    onClick={(e) => {
                      e.preventDefault();
                      setCompetences(competences.filter((cf) => cf !== c));
                    }}
                  >
                    {text.delete}
                  </button>
                </p>
              ))}
              <button
                className={formButtonStyle}
                onClick={(e) => {
                  e.preventDefault();
                  competences.push({ c: "", y: 0 });
                  setCompetences(competences.map((q) => q));
                }}
              >
                {text.add}
              </button>
            </>
            <h3 className="text-xl">{text.availability}</h3>
            <>
              {availability.map((a, i) => (
                <p key={`${a.f}${i}`} className="flex gap-3 items-center">
                  {text.from}:
                  <DatePicker
                    className={formInputTextStyle}
                    dateFormat="yyyy-MM-dd"
                    selected={a.f}
                    onChange={(d) => {
                      console.log(d);
                      if (d === null) {
                        return;
                      }
                      a.f = d;
                      setAvailability(availability.map((q) => q));
                    }}
                  />
                  {text.to}:
                  <DatePicker
                    className={formInputTextStyle}
                    dateFormat="yyyy-MM-dd"
                    selected={a.t}
                    onChange={(d) => {
                      console.log(d);
                      if (d === null) {
                        return;
                      }
                      a.t = d;
                      setAvailability(availability.map((q) => q));
                    }}
                  />
                  <button
                    className={formButtonStyle}
                    onClick={(e) => {
                      e.preventDefault();
                      setAvailability(availability.filter((af) => af !== a));
                    }}
                  >
                    {text.delete}
                  </button>
                </p>
              ))}
              <button
                className={formButtonStyle}
                onClick={(e) => {
                  e.preventDefault();
                  availability.push({ f: new Date(), t: new Date() });
                  setAvailability(availability.map((q) => q));
                }}
              >
                {text.add}
              </button>
            </>
            <input
              className={`flex justify-center w-full ${formButtonStyle} mt-2 bg-green-700`}
              type="submit"
              value={text.sumbit}
            />
          </form>
        ) : (
          <>
            <h3 className="text-xl">{text.competences}</h3>
            <>
              {applicaiton.competence_profile.map((c) => (
                <p key={c.competence_id}>
                  <>
                    {c.competence.competence_name[0]?.name || "?"}: {c.years_of_experience} {text.years}
                  </>
                </p>
              ))}
            </>
            <h3 className="text-xl">{text.availability}</h3>
            <>
              {applicaiton.availability.map((a) => (
                <p key={a.id}>
                  <>
                    {text.from}: {a.from_date.toDateString()} - {text.to}: {a.to_date.toDateString()}
                  </>
                </p>
              ))}
            </>
            <button
              className={formButtonStyle}
              onClick={() => {
                setEditing((e) => !e);
                setCompetences(
                  applicaiton.competence_profile.map((c) => ({
                    c: c.competence.competence_name[0]?.name || "?",
                    y: c.years_of_experience as unknown as number, // typescript xD
                  })),
                );
                setAvailability(
                  applicaiton.availability.map((a) => ({
                    f: a.from_date,
                    t: a.to_date,
                  })),
                );
              }}
            >
              {text.edit}
            </button>
          </>
        )}
      </div>
      {/* <p>{JSON.stringify(applicaiton)}</p> */}
    </div>
  );
}
