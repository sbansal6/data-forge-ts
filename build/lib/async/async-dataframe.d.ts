import { IAsyncIndex } from './async-index';
import { SelectorFn } from '../series';
import { IAsyncSeries } from './async-series';
import { IDataFrame } from '../dataframe';
/**
 * DataFrame configuration.
 */
export interface IAsyncDataFrameConfig<IndexT, ValueT> {
    values?: ValueT[] | AsyncIterable<ValueT>;
    index?: IndexT[] | AsyncIterable<IndexT>;
    pairs?: AsyncIterable<[IndexT, ValueT]>;
    columnNames?: string[] | AsyncIterable<string>;
}
/**
 * Interface that represents a dataframe.
 */
export interface IAsyncDataFrame<IndexT, ValueT> extends AsyncIterable<ValueT> {
    /**
     * Get an iterator to enumerate the values of the dataframe.
     */
    [Symbol.asyncIterator](): AsyncIterator<ValueT>;
    /**
     * Get the names of the columns in the dataframe.
     *
     * @returns Returns an array of the column names in the dataframe.
     */
    getColumnNames(): Promise<string[]>;
    /**
     * Get the index for the dataframe.
     */
    getIndex(): IAsyncIndex<IndexT>;
    /**
     * Apply a new index to the DataFrame.
     *
     * @param newIndex The new index to apply to the DataFrame.
     *
     * @returns Returns a new dataframe with the specified index attached.
     */
    withIndex<NewIndexT>(newIndex: NewIndexT[] | AsyncIterable<NewIndexT>): IAsyncDataFrame<NewIndexT, ValueT>;
    /**
     * Resets the index of the dataframe back to the default zero-based sequential integer index.
     *
     * @returns Returns a new dataframe with the index reset to the default zero-based index.
     */
    resetIndex(): IAsyncDataFrame<number, ValueT>;
    /**
     * Retreive a series from a column of the dataframe.
     *
     * @param columnName Specifies the name of the column that contains the series to retreive.
     */
    getSeries<SeriesValueT>(columnName: string): IAsyncSeries<IndexT, SeriesValueT>;
    /**
    * Extract values from the dataframe as an array.
    * This forces lazy evaluation to complete.
    *
    * @returns Returns an array of values contained within the dataframe.
    */
    toArray(): Promise<ValueT[]>;
    /**
     * Retreive the index and values from the DataFrame as an array of pairs.
     * Each pairs is [index, value].
     *
     * @returns Returns an array of pairs that contains the dataframe content. Each pair is a two element array that contains an index and a value.
     */
    toPairs(): Promise<([IndexT, ValueT])[]>;
    /**
     * Bake the data frame to an array of rows.
     *
     *  @returns Returns an array of rows. Each row is an array of values in column order.
     */
    toRows(): Promise<any[][]>;
    /**
     * Generate a new dataframe based by calling the selector function on each value.
     *
     * @param selector Selector function that transforms each value to create a new dataframe.
     *
     * @returns Returns a new dataframe that has been transformed by the selector function.
     */
    select<ToT>(selector: SelectorFn<ValueT, ToT>): IAsyncDataFrame<IndexT, ToT>;
    /**
     * Skip a number of values in the dataframe.
     *
     * @param numValues Number of values to skip.
     * @returns Returns a new dataframe or dataframe with the specified number of values skipped.
     */
    skip(numValues: number): IAsyncDataFrame<IndexT, ValueT>;
    /**
     * Format the dataframe for display as a string.
     * This forces lazy evaluation to complete.
     *
     * @returns Generates and returns a string representation of the dataframe or dataframe.
     */
    toString(): Promise<string>;
    /**
     * Forces lazy evaluation to complete and 'bakes' the dataframe into memory.
     *
     * @returns Returns a dataframe that has been 'baked', all lazy evaluation has completed.
     */
    bake(): Promise<IDataFrame<IndexT, ValueT>>;
    /**
     * Serialize the dataframe to JSON.
     *
     *  @returns Returns a JSON format string representing the dataframe.
     */
    toJSON(): Promise<string>;
    /**
     * Serialize the dataframe to CSV.
     *
     *  @returns Returns a CSV format string representing the dataframe.
     */
    toCSV(): Promise<string>;
}
/**
 * Class that represents a dataframe of indexed values.
 */
export declare class AsyncDataFrame<IndexT, ValueT> implements IAsyncDataFrame<IndexT, ValueT> {
    private index;
    private values;
    private pairs;
    private columnNames;
    private initFromArray(arr);
    private initEmpty();
    private initIterable<T>(input, fieldName);
    private initFromConfig(config);
    /**
     * Create a dataframe.
     *
     * @param config This can be either an array or a config object the sets the values that the dataframe contains.
     * If it is an array it specifies the values that the dataframe contains.
     * If it is a config object that can contain:
     *      values: Optional array or iterable of values that the dataframe contains.
     *      index: Optional array or iterable of values that index the dataframe, defaults to a dataframe of integers from 1 and counting upward.
     *      pairs: Optional iterable of pairs (index and value) that the dataframe contains.
     */
    constructor(config?: ValueT[] | IAsyncDataFrameConfig<IndexT, ValueT>);
    /**
     * Get an iterator to enumerate the values of the dataframe.
     * Enumerating the iterator forces lazy evaluation to complete.
     */
    [Symbol.asyncIterator](): AsyncIterator<any>;
    /**
     * Get the names of the columns in the dataframe.
     *
     * @returns Returns an array of the column names in the dataframe.
     */
    getColumnNames(): Promise<string[]>;
    /**
     * Get the index for the dataframe.
     */
    getIndex(): IAsyncIndex<IndexT>;
    /**
     * Apply a new index to the DataFrame.
     *
     * @param newIndex The new index to apply to the DataFrame.
     *
     * @returns Returns a new dataframe or dataframe with the specified index attached.
     */
    withIndex<NewIndexT>(newIndex: NewIndexT[] | AsyncIterable<NewIndexT>): IAsyncDataFrame<NewIndexT, ValueT>;
    /**
     * Resets the index of the dataframe back to the default zero-based sequential integer index.
     *
     * @returns Returns a new dataframe with the index reset to the default zero-based index.
     */
    resetIndex(): IAsyncDataFrame<number, ValueT>;
    /**
     * Retreive a series from a column of the dataframe.
     *
     * @param columnName Specifies the name of the column that contains the series to retreive.
     */
    getSeries<SeriesValueT>(columnName: string): IAsyncSeries<IndexT, SeriesValueT>;
    /**
    * Extract values from the dataframe as an array.
    * This forces lazy evaluation to complete.
    *
    * @returns Returns an array of values contained within the dataframe.
    */
    toArray(): Promise<any[]>;
    /**
     * Retreive the index and values from the DataFrame as an array of pairs.
     * Each pair is [index, value].
     * This forces lazy evaluation to complete.
     *
     * @returns Returns an array of pairs that contains the dataframe content. Each pair is a two element array that contains an index and a value.
     */
    toPairs(): Promise<([IndexT, ValueT])[]>;
    /**
     * Bake the data frame to an array of rows.
     *
     *  @returns Returns an array of rows. Each row is an array of values in column order.
     */
    toRows(): Promise<any[][]>;
    /**
     * Generate a new dataframe based by calling the selector function on each value.
     *
     * @param selector Selector function that transforms each value to create a new dataframe.
     *
     * @returns Returns a new dataframe that has been transformed by the selector function.
     */
    select<ToT>(selector: SelectorFn<ValueT, ToT>): IAsyncDataFrame<IndexT, ToT>;
    /**
     * Skip a number of values in the dataframe.
     *
     * @param numValues - Number of values to skip.     *
     * @returns Returns a new dataframe or dataframe with the specified number of values skipped.
     */
    skip(numValues: number): IAsyncDataFrame<IndexT, ValueT>;
    /**
     * Format the dataframe for display as a string.
     * This forces lazy evaluation to complete.
     *
     * @returns Generates and returns a string representation of the dataframe or dataframe.
     */
    toString(): Promise<string>;
    /**
     * Forces lazy evaluation to complete and 'bakes' the dataframe into memory.
     *
     * @returns Returns a dataframe that has been 'baked', all lazy evaluation has completed.
     */
    bake(): Promise<IDataFrame<IndexT, ValueT>>;
    /**
     * Serialize the dataframe to JSON.
     *
     *  @returns Returns a JSON format string representing the dataframe.
     */
    toJSON(): Promise<string>;
    /**
     * Serialize the dataframe to CSV.
     *
     *  @returns Returns a CSV format string representing the dataframe.
     */
    toCSV(): Promise<string>;
}