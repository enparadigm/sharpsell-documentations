import React from "react";
import Link from "@docusaurus/Link";
import { useActivePluginAndVersion } from "@docusaurus/plugin-content-docs/client";
import MDXComponents from "@theme-original/MDXComponents";

function VersionAwareLink({ href, ...props }) {
  const activeDocs = useActivePluginAndVersion();
  const versionPath =
    activeDocs?.activePlugin.pluginId === "sdk"
      ? activeDocs.activeVersion?.path?.replace(/\/$/, "")
      : undefined;
  const destination =
    versionPath && href?.startsWith("/") ? `${versionPath}${href}` : href;

  return <Link to={destination} {...props} />;
}

export default {
  ...MDXComponents,
  a: VersionAwareLink,
};
