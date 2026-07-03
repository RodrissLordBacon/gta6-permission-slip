export interface ContractFields {
  yourName: string;
  otherName: string;
  relation: string;
  days: number;
}

export interface ContractParty {
  label: string;
  name: string;
}

export interface ContractClause {
  title: string;
  body: string;
}

export interface ContractContent {
  title: string;
  subtitle: string;
  place: string;
  parties: {
    cedente: ContractParty;
    beneficiario: ContractParty;
  };
  exponen: string[];
  acuerdan: ContractClause[];
  signatures: {
    cedente: ContractParty;
    beneficiario: ContractParty;
    lineLabel: string;
  };
  footer: string;
}
