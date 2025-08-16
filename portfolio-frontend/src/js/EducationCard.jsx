import {CalendarDays, GraduationCap, BookOpen} from "lucide-react"

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
        <div
            className="w-full max-w-[90vw] content-center m-auto items-center mx-auto bg-slate-950 border border-slate-800 rounded-lg shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-950 to-slate-950 p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1 space-y-2">
                        <h2 className="text-lg md:text-xl font-bold text-blue-200 flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 flex-shrink-0"/>
                            {institution}
                        </h2>
                        <div className="space-y-1">
                            <p className="text-base md:text-lg font-semibold text-slate-100 text-left">
                                {degree} in {field}
                            </p>
                            <div
                                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-slate-300">
                                <div className="flex items-center gap-1">
                                    <CalendarDays className="h-4 w-4 flex-shrink-0"/>
                                    {startDate} - {endDate}
                                </div>
                                <span className="hidden sm:inline">•</span>
                                <span className="text-left">{location}</span>
                            </div>
                        </div>
                    </div>
                    {gpa && (
                        <div className="text-left md:text-right flex-shrink-0">
                            <p className="text-sm text-slate-300">cGPA</p>
                            <p className="text-lg font-bold text-blue-200">{gpa}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-4 md:p-6">
                <div className="flex flex-col xl:flex-row gap-6">
                    {courses.length > 0 && (
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
                                <BookOpen className="h-4 w-4 flex-shrink-0"/>
                                Relevant Courses
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {courses.map((course, index) => (
                                    <span
                                        key={index}
                                        className="bg-slate-900 text-slate-200 px-3 py-1 rounded-full text-sm border border-slate-700 hover:bg-slate-800 transition-colors w-full h-11 content-center
                                        hover:cursor-pointer hover:scale-104 transform transition-transform duration-200 ease-in-out
                                        "
                                    >
                                        <p className="text-nowrap px-2">{course.code ? `${course.code}: ${course.name}` : course.name}</p>
                  </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {achievements.length > 0 && (
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold text-slate-200 mb-3">Awards & Distinctions</h4>
                            <ul className="space-y-2 flex flex-col -ml-5">
                                {achievements.map((achievement, index) => (
                                    <li key={index} className="text-sm text-slate-300 flex items-start gap-2">
                                        <span className="text-blue-300 mt-1 flex-shrink-0 pl-5">•</span>
                                        <span className="flex-1 text-nowrap">{achievement}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
