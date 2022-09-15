import React, { useState } from 'react';

import './style.css';
import '../Globals/main.css';

import {TbFlag} from 'react-icons/tb';
import {VscDebugStart,VscDebugRestart,VscDebugPause} from 'react-icons/vsc';

function Stopwatch() {
    const [isPaused, setIsPaused] = useState(true);
    const [time, setTime] = useState(0);
    const [snaps,setSnaps] = useState([]);
    
    React.useEffect(() => {
        let interval = null;
        
        let ele = document.getElementById('needle');
        if (isPaused === false) {
            ele.style.animationPlayState = 'running';
            interval = setInterval(() => {
                setTime((time) => time + 10);
            }, 10);
        } else {
            ele.style.animationPlayState = 'paused';
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [isPaused]);
    
    const handleStart = () => {
        setIsPaused(false);
    };
    
    const handlePause = () => {
        setIsPaused(true);
    };
    
    const handleReset = () => {
        setTime(0);
        setSnaps([]);
    };

    const takeSnap = () => {
        let ti = time;
        setSnaps([...snaps,ti]);
    }

    return (
        <div className='layout box-100 bg-secondary flex-column'>
            <div className='header box-100 flex-row line-shadow'><h3>Stop<span className='color-primary'>watch</span></h3></div>
            <div className='wrapper flex-column'>
                <div className='section1 flex-row'>
                    <div className='timer flex-row' id='timer'>
                        <span id='needle'></span>
                        <div className='stopwatch flex-row space-between'>
                            {
                                isPaused
                                ? <>
                                    <div className='flex-column time timer-hours'>
                                        <p className='para-bg'>
                                            {("0" + Math.floor((time / 60000) % 60)).slice(-2)}
                                        </p>
                                        {/*<p className='para-sm'>Minutes</p>*/}
                                    </div>
                                    <p>:</p>
                                    <div className='flex-column time timer-minutes'>
                                        <p className='para-bg'>
                                            {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
                                        </p>
                                        {/*<p className='para-sm'>Seconds</p>*/}
                                    </div>
                                    <p>:</p>
                                    <div className='flex-column time timer-seconds'>
                                        <p className='para-bg color-primary'>
                                            {("0" + ((time / 10) % 100)).slice(-2)}
                                        </p>
                                        {/*<p className='para-sm'>Milli</p>*/}
                                    </div>
                                </>
                                : <>
                                    <div className='flex-column time timer-hours'>
                                        <p className='para-bgr'>
                                            {("0" + Math.floor((time / 60000) % 60)).slice(-2)}
                                        </p>
                                        {/*<p className='para-sm'>Minutes</p>*/}
                                    </div>
                                    <p>:</p>
                                    <div className='flex-column time timer-minutes'>
                                        <p className='para-bgr'>
                                            {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
                                        </p>
                                        {/*<p className='para-sm'>Seconds</p>*/}
                                    </div>
                                    <p>:</p>
                                    <div className='flex-column time timer-seconds'>
                                        <p className='para-bgr color-primary'>
                                            {("0" + ((time / 10) % 100)).slice(-2)}
                                        </p>
                                        {/*<p className='para-sm'>Milli</p>*/}
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className='section2 flex-column'>
                    <div className='snap-set flex-column mg-tp-1 mg-bt-1'>
                        {
                            snaps.map((snap,index) => <div className='snap flex-row space-between line-shadow'>
                                <p>{index+1}.</p> <p></p>
                                <p className='color-primary'>{("0" + Math.floor((snap / 60000) % 60)).slice(-2)} : {("0" + Math.floor((snap / 1000) % 60)).slice(-2)} : {("0" + ((snap / 10) % 100)).slice(-2)}</p>
                            </div>)
                        }
                    </div>
                    <div className='control-set flex-row space-between'>
                        {
                            isPaused && time > 0
                            ? <div className='button rounded small bg-dark' onClick={handleReset}><VscDebugRestart className='icon small'/></div>
                            : <div className='button rounded small bg-fade'><VscDebugRestart className='icon small'/></div>
                        }
                        {
                            isPaused
                            ? <div className='button rounded bg-primary' onClick={handleStart}><VscDebugStart className='icon big' /></div> 
                            : <div className='button rounded bg-primary' onClick={handlePause}><VscDebugPause className='icon big' /></div>
                        }
                        {
                            isPaused
                            ? <div className='button rounded small bg-fade'><TbFlag className='icon small' /></div>
                            : <div className='button rounded small bg-dark' onClick={takeSnap}><TbFlag className='icon small' /></div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stopwatch