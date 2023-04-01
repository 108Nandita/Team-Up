import React, { useEffect } from "react";

const Widget = () => {
    useEffect(() => {
        const s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://embed.tawk.to/64269ea531ebfa0fe7f5b2f0/1gsrdndnv";
        s.setAttribute('crossorigin','*');
        const t = document.getElementsByTagName("script")[0];
        t.parentNode.insertBefore(s, t);
    }, []);

    return <div className="chat-widget" />;
};

export default Widget;