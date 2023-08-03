import styles from "./scroll.module.css";
const ScrollingContainer = props => {
    return (
        <div className={styles.scrollWrapper}>
            <ul className={`${styles.scrollingContainer} custom-scroll`}>
                {props.children}
            </ul>
        </div>
    );
}
export default ScrollingContainer;