import styles from "./scrolling-container.module.css";
const ScrollingContainer = (props) => {
  let fullClassName = "";
  if (props.className) {
    fullClassName = `${styles.scrollingContainer} ${styles[props.className]}`;
  } else {
    fullClassName = `${styles.scrollingContainer}`;
  }
  return (
    <div className={styles.scrollWrapper}>
      <ul className={`${fullClassName} custom-scroll`}>{props.children}</ul>
    </div>
  );
};
export default ScrollingContainer;
