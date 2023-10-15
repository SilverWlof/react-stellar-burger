import styles from "./centred-control.module.css";
const CentredControl = (props) => {
  return <div className={styles.Container}>{props.children}</div>;
};
export default CentredControl;
