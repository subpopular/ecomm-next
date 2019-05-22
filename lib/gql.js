export { default as gql } from 'graphql-tag'
import { useQuery as _useQuery } from 'react-apollo-hooks'
import { useMutation as _useMutation } from 'react-apollo-hooks'

export const useQuery = (query, opts) => _useQuery(query, { suspend: false, ...opts })
export const useMutation = _useMutation
