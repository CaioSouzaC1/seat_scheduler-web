import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useEffect } from "react";
import Unauthorized from "../unauthorized";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const ComponentWithAuth = (props: P) => {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (process.browser && status === "unauthenticated") {
        router.replace("/?not-logged");
      }
    }, [status, router]);

    if (status === "authenticated") {
      return <WrappedComponent {...props} />;
    }

    if (status != "loading") {
      return <Unauthorized />;
    }

    return null;
  };

  ComponentWithAuth.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithAuth;
};

export default withAuth;
