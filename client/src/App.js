import React, { useState, useCallback, useEffect, Fragment } from "react";
import axios from "axios";

const App = () => {
  const PAGE_SIZE = 4;
  const [templates, setTemplates] = useState({});
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  const setCurrentPageCallback = useCallback(
    newCurrentPage => {
      setCurrentPage(parseInt(newCurrentPage));
    },
    [setCurrentPage]
  );

  const setSelectedTemplateCallback = useCallback(
    newSelectedTemplate => {
      setSelectedTemplate(newSelectedTemplate);
    },
    [setSelectedTemplate]
  );

  const setTemplatesCallback = useCallback(
    newTemplates => {
      setTemplates(newTemplates);
      [[newTemplates].flat().find(() => true)].map(newSelectedTemplate => {
        setSelectedTemplateCallback(newSelectedTemplate);
      });
    },
    [setTemplates]
  );

  useEffect(() => {
    axios.get(`/templates`).then(response => {
      return setTemplatesCallback(response.data);
    });
  }, [setTemplatesCallback]);

  return (
    <div id="container">
      <header>Code Development Project</header>
      <div id="main" role="main">
        <div id="large">
          <div class="group">
            <img
              src={`images/large/${selectedTemplate.image}`}
              alt="Large Image"
              width="430"
              height="360"
            ></img>
            <div class="details">
              <p>
                <strong>Title</strong> {` ${selectedTemplate.title}`}
              </p>
              <p>
                <strong>Description</strong>{" "}
                {` ${selectedTemplate.description}`}
              </p>
              <p>
                <strong>Cost</strong> {` ${selectedTemplate.cost}`}
              </p>
              <p>
                <strong>ID #</strong> {` ${selectedTemplate.id}`}
              </p>
              <p>
                <strong>Thumbnail File</strong>{" "}
                {` ${selectedTemplate.thumbnail}`}
              </p>
              <p>
                <strong>Large Image File</strong> {` ${selectedTemplate.image}`}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Fragment key="previous_button">
        {["o"]
          .filter(() => currentPage > 0)
          .map(() => {
            const previousPage = currentPage - 1;
            return (
              <a
                key="previous"
                href={`/#`}
                onClick={() => {
                  setCurrentPageCallback(previousPage);
                  return false;
                }}
                className="previous"
                title="Previous"
              >
                <img></img>
              </a>
            );
          })}
      </Fragment>

      <Fragment key="next_button">
        {["o"]
          .filter(() => {
            return (currentPage + 1) * PAGE_SIZE < templates.length;
          })
          .map(() => {
            const nextPage = 1 + currentPage;
            return (
              <a
                key="next"
                href={`/#`}
                onClick={() => {
                  setCurrentPageCallback(nextPage);
                  return false;
                }}
                className="next"
                title="Next"
              >
                <img></img>
              </a>
            );
          })}
      </Fragment>

      <div class="thumbnails">
        <div class="group">
          {[templates]
            .flat()
            .slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE)
            .map(template => (
              <a
                href="#"
                title={`${template.title}`}
                onClick={() => {
                  setSelectedTemplateCallback(template);
                  return false;
                }}
              >
                <img
                  src={`./images/thumbnails/${template.thumbnail}`}
                  alt={`${template.id}`}
                  width="145"
                  height="121"
                />
                <span>{`${template.id}`}</span>
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
