import {useParams, useNavigate} from "react-router-dom";
import React from 'react'
import StatisticsMode from "./StatisticsMode";

export default function WrappedStatisticsMode(props) {
  const params = useParams()
  const navigate = useNavigate()

  return <StatisticsMode params={params} navigate={navigate}/>
}
