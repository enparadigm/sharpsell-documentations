import React from "react";
import Link from "@docusaurus/Link";
import { useActivePluginAndVersion } from "@docusaurus/plugin-content-docs/client";

const VersionedLink = ({ to, ...props }) => {
  const activeDocs = useActivePluginAndVersion();
  const versionPath =
    activeDocs?.activePlugin.pluginId === "sdk"
      ? activeDocs.activeVersion?.path?.replace(/\/$/, "")
      : undefined;
  const destination =
    versionPath && to.startsWith("/") ? `${versionPath}${to}` : to;

  return <Link to={destination} {...props} />;
};

export default VersionedLink;
