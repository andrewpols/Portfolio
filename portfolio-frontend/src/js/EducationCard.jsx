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
        <article className="education">
            <header className="education-head">
                <h3 className="education-school">{institution}</h3>
                <p className="education-dates">{startDate}–{endDate}</p>
            </header>
            <p className="education-degree">
                {degree}, {field}
                {gpa && <span> · GPA {gpa}</span>}
            </p>
            {location && <p className="education-meta">{location}</p>}

            {courses.length > 0 && (
                <div className="education-block">
                    <h4>Coursework</h4>
                    <ul>
                        {courses.map((c) => (
                            <li key={c.code ?? c.name} className="education-course">
                                <span className="education-code">{c.code}</span>
                                <span className="education-course-name">{c.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {achievements.length > 0 && (
                <div className="education-block">
                    <h4>Honours</h4>
                    <ul>
                        {achievements.map((a) => (
                            <li key={a}>{a}</li>
                        ))}
                    </ul>
                </div>
            )}
        </article>
    );
}
