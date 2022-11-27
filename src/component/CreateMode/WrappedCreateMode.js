import {useParams, useNavigate} from "react-router-dom";
import React from 'react'
import CreateMode from "./CreateMode";

export default function WrappedCreateMode(props) {
  const params = useParams()
  const navigate = useNavigate()

  return <CreateMode params={params} navigate={navigate}/>
}
