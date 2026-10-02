import { CalendarDays, GraduationCap, BookOpen } from "lucide-react"

export function EducationCard({
    institution,
    degree,
    field,
    startDate,
    endDate,
    gpa,
    location,
    courses = [],
    achievements = [],
}) {
    return (
        <div className="w-full max-w-[90vw] content-center m-auto items-center mx-auto bg-[#0d1320] border border-slate-800 rounded-[4px] overflow-hidden shadow-none">
            <div className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 pb-4 border-b border-slate-800">
                    <div className="flex-1 space-y-2">
                        <h2 className="text-lg md:text-xl font-bold text-slate-100 flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 flex-shrink-0 text-slate-300" />
                            {institution}
                        </h2>
                        <div className="space-y-1">
                            <p className="text-base md:text-lg font-semibold text-slate-100 text-left">
                                {degree}, {field}
                            </p>
                            <div className="w-full flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-slate-300">
                                <div className="flex items-center gap-1">
                                    <CalendarDays className="h-4 w-4 flex-shrink-0 text-slate-400" />
                                    {startDate} - {endDate}
                                </div>
                                <span className="hidden sm:inline text-slate-500">•</span>
                                <span className="text-left">{location}</span>
                            </div>
                        </div>
                    </div>
                    {gpa && (
                        <div className="text-left md:text-right flex-shrink-0">
                            <p className="text-sm text-slate-400">GPA</p>
                            <p className="text-lg font-bold text-slate-100">{gpa}</p>
                        </div>
                    )}
                </div>

                <div className="pt-5">
                    {courses.length > 0 && (
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
                                <BookOpen className="h-4 w-4 flex-shrink-0 text-slate-400" />
                                Relevant Courses
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {courses.map((course, index) => (
                                    <span
                                        key={index}
                                        className="bg-[#0b1220] text-slate-200 px-3 py-2 rounded-[3px] text-sm border border-slate-800 w-full h-max content-center"
                                    >
                                        <p className="text-nowrap px-2">{course.code ? `${course.code}: ${course.name}` : course.name}</p>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
