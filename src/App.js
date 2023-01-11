import { useEffect, useState } from "react";

function App() {
  const [cores, setCores] = useState([]);
  const [showDesc, setShowDesc] = useState(false);

  useEffect(() => {
    fetch("https://api.spacexdata.com/v3/launches")
      .then((res) => res.json())
      .then((data) => setCores(data));
  });

  function handleClick(evt) {
    setShowDesc(!showDesc);
  }

  return (
    <>
      {cores.map((core, i) => (
        <div
          key={i}
          className="border shadow-lg rounded-lg my-10 mx-auto p-5 w-5/12"
        >
          <h2 className="font-bold text-2xl">{core.mission_name}</h2>
          {showDesc && (
            <div>
              <div className="text-sm text-blue-600 font-bold">
                {core.links.article_link ? (
                  <a href={core.links.article_link}>Article</a>
                ) : (
                  <span className="text-gray-500 font-normal">No Article</span>
                )}
                <span> | </span>
                {core.links.video_link ? (
                  <a href={core.links.video_link}>Video</a>
                ) : (
                  <span className="text-gray-500 font-normal">No Video</span>
                )}
              </div>
              <div className="flex mt-3">
                <img
                  src={core.links.mission_patch_small}
                  alt="mission patch"
                  className="w-24 mr-5"
                />
                <p>{core.details}</p>
              </div>
            </div>
          )}
          <button onClick={handleClick} className="btn btn-primary mt-5">
            {!showDesc ? "View" : "Hide"}
          </button>
        </div>
      ))}
    </>
  );
}

export default App;
