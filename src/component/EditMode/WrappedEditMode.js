import {useParams, useNavigate} from "react-router-dom";
import React from 'react'
import EditMode from "./EditMode";

export default function WrappedEditMode(props) {
  const params = useParams()
  const navigate = useNavigate()

  return <EditMode params={params} navigate={navigate}/>
}
