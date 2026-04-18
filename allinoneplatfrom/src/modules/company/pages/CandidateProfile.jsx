import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleApplicantAPI } from "../../../services/AllAPI";

export default function CandidateProfile() {

    const { id } = useParams();
    const [user, setUser] = useState(null);

    const token = localStorage.getItem("token");

    const reqHeader = {
        Authorization: `Bearer ${token}`
    };

    const fetchApplicant = async () => {
        try {
            const res = await getSingleApplicantAPI(id, reqHeader);

            console.log("DATA:", res.data);
            // console.log("Applicant Data:", res.data);


            if (res.status === 200) {
                setUser(res.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchApplicant();
    }, []);

    if (!user) return <h2>Loading...</h2>;

    return (
        <div className="p-10 max-w-4xl mx-auto bg-white shadow rounded">

            <h2 className="text-2xl font-bold mb-6">
                Candidate Details
            </h2>

            <p><b>Name:</b> {user.name}</p>
            <p><b>Email:</b> {user.usermail}</p>
            <p><b>Location:</b> {user.location}</p>
            <p><b>Portfolio:</b> {user.portfolio}</p>

            <div className="mt-4">
                <b>Cover Letter:</b>
                <p>{user.coverletter}</p>
            </div>

            <div className="mt-4">
                <b>Job Applied:</b> {user.jobId?.title}
            </div>

            <div className="mt-4">
                <b>Resume Files:</b>

                {user.resume?.map((file, index) => (
                    <div key={index}>
                        <a
                            href={`http://localhost:3000/uploads/resumes/${file}`}

                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 underline"
                        >
                            View Resume
                        </a>
                    </div>
                ))}

            </div>

        </div>
    );
}
