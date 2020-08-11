export type ParserFunction = (value: any) => any;
export type ParserList = Map<string, ParserFunction>;


export class B12Normalizer {
  constructor(private _parsers: ParserList = new Map()) {}

  /**
   * Return the list of registered parsers.
   *
   * @returns The list of registered parsers
   */
  get parsers(): ParserList {
    return this._parsers;
  }

  /**
   * Add a parser to the list of parsers
   * @param name The key to use for parse with this parser
   * @param parser The function called for parse the data
   */
  public addParser(name: string, parser: ParserFunction) {
    if (this._parsers.get(name))
      return; // TODO: Throw exception

    this.setParser(name, parser);
  }

  /**
   * Set the parser for the key
   * @param name
   * @param parser
   */
  public setParser(name: string, parser: ParserFunction) {
    this._parsers.set(name, parser);
  }

  /**
   * Remove a parser from the list
   * @param name The name of the parser to remove
   */
  public removeParser(name: string) {
    this._parsers.delete(name);
  }

  /**
   * Normalize the given object
   * @param toNormalize The object to normalize
   * @param rules The normalization options
   */
  public normalize(toNormalize: object | [], rules: object) {
    if (!toNormalize)
      return toNormalize;

    if (Array.isArray(toNormalize))
      return this.normalizeArray(toNormalize, rules);

    for (let [key, rule] of Object.entries(rules)) {
      let currentKey = toNormalize[key as keyof typeof toNormalize];

      if (!currentKey) {
        continue;
      }

      if (typeof rule === 'object' && !Array.isArray(rule)) {
        if (Array.isArray(currentKey)) {
          this.normalizeArray(currentKey, rule);
        } else {
          this.normalize(currentKey, rule);
        }
        continue;
      }

      if (!Array.isArray(rule)) {
        rule = [rule];
      }

      currentKey = this.applyRules(currentKey, rule) as never;
      toNormalize[key as keyof typeof toNormalize] = currentKey;
    }

    return toNormalize;
  }

  /**
   * Normalize an array of element
   * @param toNormalize The data to normalize
   * @param rules The parsing rules to apply
   * @private
   */
  private normalizeArray(toNormalize: [], rules: object) {
    for (let i = 0 ; i < toNormalize.length; i++) {
      toNormalize[i] = this.normalize(toNormalize[i], rules) as never;
    }

    return toNormalize;
  }

  /**
   * Apply some rules to data
   * @param value The value to parse
   * @param rules The rules used to parse
   * @private
   */
  private applyRules(value: any, rules: (ParserFunction | string)[]) {
    for (const rule of rules) {
      value = this.applyRule(value, rule);
    }
    return value;
  }

  /**
   * Apply a rule to data
   * @param value The value to parse
   * @param rule The rule used to parse
   * @private
   */
  private applyRule(value: any, rule: ParserFunction | string) {
    if (typeof rule === 'function') {
      return rule(value);
    }

    const parser = this._parsers.get(rule);

    if (!parser) {
      return value; // TODO: Throw exception
    }

    return parser(value);
  }
}