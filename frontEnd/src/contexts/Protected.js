import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Authentification(props) {
  const Cmp = props.Cmp;

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Cmp />
    </>
  );
}
