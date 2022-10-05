// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "ds-test/test.sol";
import "../../src/facets/Test1Facet.sol";

contract test1Facet is DSTest {
    Test1Facet facet;

    function setUp() public {
        facet = new Test1Facet();
    }

    function testExample() public {
        assertEq(facet.test1Func1(), 1);
        assertEq(facet.test1Func2(), 2);
        assertEq(facet.test1Func3(), 3);
        assertEq(facet.test1Func4(), 4);
        assertEq(facet.test1Func5(), 5);
        assertEq(facet.test1Func6(), 6);
        assertEq(facet.test1Func7(), 7);
        assertEq(facet.test1Func8(), 8);
        assertEq(facet.test1Func9(), 9);
        assertEq(facet.test1Func10(), 10);
    }
}