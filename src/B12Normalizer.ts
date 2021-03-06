export type ParserFunction = (value: any, args?: any) => any;
export type ParserList = Map<string, ParserFunction>;

export interface Rule {
  action?: ParserFunction;
  parser?: string;
  arguments?: any;
}

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
      throw new Error('Parser already exist');

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
   * Return a parser by name.
   * Throw an exception if the parser does not exist.
   * @param name The name of the parser to find
   */
  public getParserByName(name: string) {
    const parser = this._parsers.get(name);

    if (!parser) {
      throw new Error(`Parser '${name}' not found`);
    }

    return parser
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

    const toNormalizeCopy = JSON.parse(JSON.stringify(toNormalize)) as object | [];

    if (Array.isArray(toNormalizeCopy))
      return this.normalizeArray(toNormalizeCopy, rules);

    for (let [key, rule] of Object.entries(rules)) {
      let currentKey = toNormalizeCopy[key as keyof typeof toNormalize];

      if (!currentKey) {
        continue;
      }

      if (typeof rule === 'object' && !Array.isArray(rule) && typeof currentKey === 'object') {
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
      toNormalizeCopy[key as keyof typeof toNormalizeCopy] = currentKey;
    }

    return toNormalizeCopy;
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

  private getRuleObject(rule: ParserFunction | string | Rule): Rule {
    let result = {} as Rule;

    if (typeof rule === 'function') {
      result.action = rule;
    } else if (typeof rule === 'string') {
      result.action = this.getParserByName(rule);
    } else {
      if (!rule.action)
        rule.action = this.getParserByName(rule.parser!);
      result = rule;
    }

    result.arguments = result.arguments || {};
    return result;
  }

  /**
   * Apply a rule to data
   * @param value The value to parse
   * @param rule The rule used to parse
   * @private
   */
  private applyRule(value: any, rule: ParserFunction | string | Rule) {
    rule = this.getRuleObject(rule);

    return rule.action!(value, rule.arguments);
  }
}