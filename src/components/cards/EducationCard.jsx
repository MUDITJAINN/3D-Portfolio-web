import React from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import styled from "styled-components";

const Top = styled.div`
  width: 100%;
  display: flex;
  max-width: 100%;
  gap: 12px;
`;

const Image = styled.img`
  height: 50px;
  border-radius: 10px;
  margin-top: 4px;
  @media only screen and (max-width: 768px) {
    height: 40px;
  }
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const School = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary || "#fff"};
  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const Degree = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary || "#ddd"};
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const Date = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary || "#ccc"};

  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

const Description = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary || "#fff"};
  margin-bottom: 10px;
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
  
  ul {
    padding-left: 20px;
    list-style-type: disc;
  }

  li {
    margin-bottom: 5px;
  }
`;

const Grade = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary || "#ddd"};
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;


const EducationCard = ({ education }) => {
  if (!education) {
    return null; // or return a default component or message
  }

  // Split description into points by newline or period
  const descriptionPoints = education.desc
    ? education.desc.split(/(?<=\.)\s+/).filter(point => point.trim() !== '')
    : [];

  return (
    <VerticalTimelineElement
      icon={
        <img
          width="100%"
          height="100%"
          alt={education.school || "School"}
          style={{ borderRadius: "50%", objectFit: "cover" }}
          src={education.img || ""}
        />
      }
      contentStyle={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        background: "#1d1836",
        color: "#fff",
        boxShadow: "rgba(23, 92, 230, 0.15) 0px 4px 24px",
        backgroundColor: "rgba(17, 25, 40, 0.83)",
        border: "1px solid rgba(255, 255, 255, 0.125)",
        borderRadius: "6px",
      }}
      contentArrowStyle={{
        borderRight: "7px solid  rgba(255, 255, 255, 0.3)",
      }}
      date={education.date || ""}
    >
      <Top>
        <Image src={education.img || ""} />
        <Body>
          <School>{education.school || "School"}</School>
          <Degree>{education.degree || "Degree"}</Degree>
          <Date>{education.date || "Date"}</Date>
        </Body>
      </Top>
      <Grade>
        <b>Grade : </b>
        {education.grade || "Grade"}
      </Grade>
      <Description>
        {descriptionPoints.length > 0 && (
          <ul>
            {descriptionPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        )}
      </Description>
    </VerticalTimelineElement>
  );
};

export default EducationCard;
