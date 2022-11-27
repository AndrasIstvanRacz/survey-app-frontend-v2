import {useParams, useNavigate} from "react-router-dom";
import FillMode from "./FillMode";
import React from 'react'

export default function WrappedFillMode(props) {
  const params = useParams()
  const navigate = useNavigate()

  return <FillMode params={params} navigate={navigate}/>
}
