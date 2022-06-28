import { json } from "@remix-run/node";
import type { RegistrationStatusChanged } from "~/models/types/registration-status-change";
import { changeRegistrationStatus } from "~/models/registrations.server";
import type { LoaderFunction } from "@remix-run/node";
export const loader: LoaderFunction = async ({ request }) => {
  switch (request.method) {
    case "POST": {
      const statusMessage = (await request.json()) as RegistrationStatusChanged;

      await changeRegistrationStatus({
        registrationId: statusMessage.requestId,
        status: statusMessage.status,
      });
      return json({ success: true }, 200);
    }
  }
};
