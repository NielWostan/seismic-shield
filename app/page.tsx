import Link from "next/link";

export default async function Page() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-4xl font-bold text-center text-black tracking-tight mb-12">
        Seismic Shield
      </h1>
      <Link
        href="/earthquake"
        className="h-16 text-xl bg-white border-2 border-black text-black rounded-md p-4 w-64 text-center"
      >
        Register Earthquake
      </Link>
      <Link
        href="/center"
        className="h-16 text-xl bg-white border-2 border-black text-black rounded-md p-4 w-64 text-center"
      >
        Register Relief Center
      </Link>
      <Link
        href="/volunteer"
        className="h-16 text-xl bg-white border-2 border-black text-black rounded-md p-4 w-64 text-center"
      >
        Register Volunteer
      </Link>
      <Link
        href="/victim"
        className="h-16 text-xl bg-white border-2 border-black text-black rounded-md p-4 w-64 text-center"
      >
        Register Victim
      </Link>
      <hr className="border-1 border-black w-full my-8 opacity-30" />
      <Link
        href="/get-earthquakes"
        className="h-16 text-xl bg-white border-2 border-black text-black rounded-md p-4 w-64 text-center"
      >
        All Earthquakes
      </Link>
      <Link
        href="/get-volunteers"
        className="h-16 text-xl bg-white border-2 border-black text-black rounded-md p-4 w-64 text-center"
      >
        Volunteers by Center
      </Link>
      <Link
        href="/victim-severity"
        className="h-16 text-xl bg-white border-2 border-black text-black rounded-md p-4 w-64 text-center"
      >
        Get Victim Severity
      </Link>
      <Link
        href="/get-victims"
        className="h-16 text-xl bg-white border-2 border-black text-black rounded-md p-4 w-64 text-center"
      >
        Get Victim Stats
      </Link>
      <Link
        href="/all-people"
        className="h-16 text-xl bg-white border-2 border-black text-black rounded-md p-4 w-64 text-center"
      >
        List All People
      </Link>
      <Link
        href="/above-avg-centers"
        className="h-16 text-xl bg-white border-2 border-black text-black rounded-md p-4 w-auto text-center"
      >
        Centers with Above Avg Supplies
      </Link>
      <Link
        href="/critical-victims-percentage"
        className="h-16 text-xl bg-white border-2 border-black text-black rounded-md p-4 w-auto text-center"
      >
        Most Affected Counties
      </Link>
      <Link
        href="/earthquake-impact"
        className="h-16 text-xl bg-white border-2 border-black text-black rounded-md p-4 w-auto text-center"
      >
        Earthquake Impact Summary
      </Link>
    </div>
  );
}
