HERNANDEZ MINI PRODUCT CATALOG CONTINUATION

1. Why do we use two separate states, searchText and debouncedSearch, instead of only one?

searchText represents every character the user currently types while debouncedSearch is the value used to filter products after the user pauses for 300 milliseconds. This keeps the input responsive and avoids filtering or updating the document title on every keystroke.


2. What would happen if the debounce effect did not return a cleanup function?

Old setTimeout operations could continue running after searchText changes. The filtering state might update based on stale typing values and timers could accumulate. The cleanup function calls clearTimeout so only the timer for the latest pause remains active.


3. What is the purpose of the dependency array? What happens if it is empty ([])? What happens if it is left out completely?

The dependency array tells React when to rerun an effect. An effect with [] runs once after the initial render and not again for state or prop changes. An effect with no dependency array runs after every render, which can be unnecessary or can create an infinite loop when the effect updates state. [searchText] reruns the debounce effect only when the search text changes and [filteredProducts.length] updates the document title when the result count changes.


4. Why should we avoid sorting the original products array directly?

The original products array is shared application data and should remain unchanged. Calling sort directly mutates that array. Taking a copy with [products] before filtering and sorting produces a display list while preserving the original order and allowing filters and sort changes to be reapplied predictably.


5. Is the filtered product list better stored in its own state, or calculated from existing state during rendering? Explain your choice.

The filtered product list is better calculated during rendering from existing state: products, debouncedSearch, category, and sortOrder. It is derived data, so storing it separately could create duplicate state that becomes out of sync. Calculating it each render ensures the list always reflects the latest filter and sort values. The small array copy and sorting cost is acceptable for this catalog.
