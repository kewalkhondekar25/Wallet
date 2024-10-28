"use client"
import Image from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { useAppDispatch, useAppSelector } from "./redux/hooks/hooks";
import {increase, decrease} from "../app/redux/features/counter/counterSlice"

export default function Home() {

  const {count} = useAppSelector(state => state.counter);
  const dispatch = useAppDispatch();

  return (
    <div>
      <button className="bg-black text-white" onClick={() => dispatch(increase())}>
        +
      </button>
        {count}
      <button className="bg-black text-white" onClick={() => dispatch(decrease())}>
        -
      </button> 
    </div>
  );
}
