import * as t from "io-ts";
import { BaseAPIResponse } from "../schemas";

export const AddressKeyObject = t.type({
    ID: t.string,
    Primary: t.number,
    Flags: t.number,
    Fingerprint: t.string,
    Fingerprints: t.array(t.string),
    PublicKey: t.string,
    Active: t.number,
    Version: t.number,
    Activation: t.unknown,
    PrivateKey: t.string,
    Token: t.unknown,
    Signature: t.unknown,
});

export const AddressObject = t.type({
    ID: t.string,
    DomainID: t.string,
    Email: t.string,
    Status: t.number,
    Type: t.number,
    Receive: t.number,
    Send: t.number,
    DisplayName: t.string,
    Signature: t.string,
    Order: t.number,
    Priority: t.number,
    HasKeys: t.number,
    SignedKeyList: t.unknown,
    Keys: t.array(AddressKeyObject),
});

export const AddressResponse = t.intersection([
    BaseAPIResponse,
    t.type({
        Addresses: t.array(AddressObject),
    }),
]);

export const KeySalt = t.type({
    ID: t.string,
    KeySalt: t.string,
});


export const KeySaltsResponse = t.intersection([
    BaseAPIResponse,
    t.type({
        KeySalts: t.array(KeySalt),
    }),
]);
