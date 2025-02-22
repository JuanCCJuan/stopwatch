{/* HOOKS */}
import { useEffect, useRef, useState } from 'react';

{/* STYLES */}
import styles from './Stopwatch.module.css';

{/* IMAGES */}
import { FaPlay, FaStop, FaPause } from 'react-icons/fa';

const iconColor = '#618EF2';

export const Stopwatch = () => {
    const intervalRef = useRef(null);

    const [playState, setPlayState] = useState(
        () => JSON.parse(localStorage.getItem('playState')) || false
    );
    
    const [currentTime, setCurrentTime] = useState(
        () => JSON.parse(localStorage.getItem('currentTime')) || 0
    );

    useEffect(() => {
        localStorage.setItem('playState', JSON.stringify(playState));
    }, [playState]);

    useEffect(() => {
        localStorage.setItem('currentTime', JSON.stringify(currentTime));
    }, [currentTime]);

    const handlePlayState = () => {
        setPlayState(prev => !prev);
        clearInterval(intervalRef.current);

        if (!playState) {
            intervalRef.current = setInterval(() => {
                setCurrentTime(prev => prev + 10);
            }, 10);
        }
    };

    const handleStopState = () => {
        setPlayState(false);
        setCurrentTime(0);
        clearInterval(intervalRef.current);
    };

    const ms = currentTime;
    const seconds = (ms / 1000) % 60;
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

    return (
        <div className={`center ${styles.base}`}>
            <h1 className={styles.base__title}>Cronómetro</h1>
            <p className={styles.base__time}>
                {(hours > 0) && <span>{`${hours < 10 ? '0' : ''}${hours}:`}</span>}
                <span>{`${minutes < 10 ? '0' : ''}${minutes}:`}</span>
                <span>{`${seconds < 10 ? '0' : ''}${seconds.toFixed(2)}`}</span>
            </p>

            <div className={`center ${styles.base__buttons}`}>
                <button className={`center ${styles.button}`} onClick={handlePlayState}>
                    {playState ? (
                        <FaPause className={styles.button__icon} fill={iconColor} />
                    ) : (
                        <FaPlay className={styles.button__icon} fill={iconColor} />
                    )}
                </button>
                <button className={`center ${styles.button}`} onClick={handleStopState}>
                    <FaStop className={styles.button__icon} fill={iconColor} />
                </button>
            </div>
        </div>
    );
};
