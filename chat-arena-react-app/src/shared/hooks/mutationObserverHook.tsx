import React, {useEffect, useState} from "react";

const DEFAULT_OPTIONS = {
    config: {attributes: true, subtree: true, childList: true}
};

export default function useMutationObservable(targetEl:any, cb:()=>void, options = DEFAULT_OPTIONS) {
    const [observer, setObserver] = useState<MutationObserver | null>(null);

    useEffect(() => {
        const obs = new MutationObserver(cb);
        setObserver(obs);
    }, [cb, options, setObserver]);

    useEffect(() => {
        if (!observer) return;
        const {config} = options;
        observer.observe(targetEl, config);
        observer.takeRecords()
        return () => {
            if (observer) {
                observer.takeRecords()
                observer.disconnect();
            }
        };
    }, [observer, targetEl, options]);
}