import styles from "./feed-list.module.css";
import React, { FunctionComponent } from "react";
import { ScrollingContainer } from "../scrolling-container/scrolling-container";

export const FeedList: FunctionComponent = ({ ...props }) => {
    return (
        <div className={styles.feedList}>
            <div className={styles.orderList}>
                <ScrollingContainer className="gap4">
                    {props.children}
                </ScrollingContainer>
            </div>
        </div>
    );
}