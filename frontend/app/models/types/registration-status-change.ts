/* eslint-disable */
import { Timestamp } from "./google/protobuf/timestamp";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export interface RegistrationStatusChanged {
  requestId: string;
  timestamp: Date | undefined;
  status: RegistrationStatusChanged_Status;
}

export enum RegistrationStatusChanged_Status {
  PENDING = 0,
  PROCESSING = 1,
  COMPLETED = 2,
  FAILED = 3,
  UNRECOGNIZED = -1,
}

export function registrationStatusChanged_StatusFromJSON(
  object: any
): RegistrationStatusChanged_Status {
  switch (object) {
    case 0:
    case "PENDING":
      return RegistrationStatusChanged_Status.PENDING;
    case 1:
    case "PROCESSING":
      return RegistrationStatusChanged_Status.PROCESSING;
    case 2:
    case "COMPLETED":
      return RegistrationStatusChanged_Status.COMPLETED;
    case 3:
    case "FAILED":
      return RegistrationStatusChanged_Status.FAILED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RegistrationStatusChanged_Status.UNRECOGNIZED;
  }
}

export function registrationStatusChanged_StatusToJSON(
  object: RegistrationStatusChanged_Status
): string {
  switch (object) {
    case RegistrationStatusChanged_Status.PENDING:
      return "PENDING";
    case RegistrationStatusChanged_Status.PROCESSING:
      return "PROCESSING";
    case RegistrationStatusChanged_Status.COMPLETED:
      return "COMPLETED";
    case RegistrationStatusChanged_Status.FAILED:
      return "FAILED";
    case RegistrationStatusChanged_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseRegistrationStatusChanged(): RegistrationStatusChanged {
  return { requestId: "", timestamp: undefined, status: 0 };
}

export const RegistrationStatusChanged = {
  encode(
    message: RegistrationStatusChanged,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(10).string(message.requestId);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestamp),
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(24).int32(message.status);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RegistrationStatusChanged {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegistrationStatusChanged();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requestId = reader.string();
          break;
        case 2:
          message.timestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegistrationStatusChanged {
    return {
      requestId: isSet(object.requestId) ? String(object.requestId) : "",
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
      status: isSet(object.status)
        ? registrationStatusChanged_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: RegistrationStatusChanged): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.timestamp !== undefined &&
      (obj.timestamp = message.timestamp.toISOString());
    message.status !== undefined &&
      (obj.status = registrationStatusChanged_StatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RegistrationStatusChanged>, I>>(
    object: I
  ): RegistrationStatusChanged {
    const message = createBaseRegistrationStatusChanged();
    message.requestId = object.requestId ?? "";
    message.timestamp = object.timestamp ?? undefined;
    message.status = object.status ?? 0;
    return message;
  },
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
