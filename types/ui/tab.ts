import Desirability from "../desirability";

export default interface Tab {
  readonly label: string;
  readonly desirability: Desirability;
}
