import { expect } from 'chai';
import { resolveDependencies } from '../parser/parser.js';

const normalize = (str) => str.replace(/\s+/g, ' ').trim();

it('should resolve easy dependencies', (done) => {
    let libraries = `A depends on B C
B depends on C E
C depends on G  
D depends on A F   
E depends on F
F depends on H`;
    let expectedOutput = `A depends on B C E F G H
B depends on C E F G H
C depends on G
D depends on A B C E F G H
E depends on F H
F depends on H`;
    const dependencies = resolveDependencies(libraries);
    expect(normalize(dependencies)).to.equal(normalize(expectedOutput));
    done();
});

it('should handle single dependency', (done) => {
    let libraries = `A depends on B`;
    let expectedOutput = `A depends on B`;
    const dependencies = resolveDependencies(libraries);
    expect(normalize(dependencies)).to.equal(normalize(expectedOutput));
    done();
});

it('should handle no dependencies', (done) => {
    let libraries = `A depends on `;
    let expectedOutput = `A depends on `;
    const dependencies = resolveDependencies(libraries);
    expect(normalize(dependencies)).to.equal(normalize(expectedOutput));
    done();
});

it('should handle circular dependencies', (done) => {
    let libraries = `A depends on B
B depends on A`;
    let expectedOutput = `A depends on B
B depends on A`;
    const dependencies = resolveDependencies(libraries);
    expect(normalize(dependencies)).to.equal(normalize(expectedOutput));
    done();
});

it('should handle multiple dependencies', (done) => {
    let libraries = `A depends on B C D`;
    let expectedOutput = `A depends on B C D`;
    const dependencies = resolveDependencies(libraries);
    expect(normalize(dependencies)).to.equal(normalize(expectedOutput));
    done();
});

it('should handle complex dependencies', (done) => {
    let libraries = `A depends on B C
B depends on D E
C depends on F
D depends on G
E depends on H
F depends on I
G depends on J
H depends on K
I depends on L
J depends on M
K depends on N
L depends on O
M depends on P
N depends on Q
O depends on R
P depends on S
Q depends on T
R depends on U
S depends on V
T depends on W
U depends on X
V depends on Y
W depends on Z`;
    let expectedOutput = `A depends on B C D E F G H I J K L M N O P Q R S T U V W X Y Z
B depends on D E G H J K M N P Q S T V W Y Z
C depends on F I L O R U X
D depends on G J M P S V Y
E depends on H K N Q T W Z
F depends on I L O R U X
G depends on J M P S V Y
H depends on K N Q T W Z
I depends on L O R U X
J depends on M P S V Y
K depends on N Q T W Z
L depends on O R U X
M depends on P S V Y
N depends on Q T W Z
O depends on R U X
P depends on S V Y
Q depends on T W Z
R depends on U X
S depends on V Y
T depends on W Z
U depends on X
V depends on Y
W depends on Z`;
    const dependencies = resolveDependencies(libraries);
    expect(normalize(dependencies)).to.equal(normalize(expectedOutput));
    done();
});

it('should handle dependencies', (done) => {
    let libraries = `A depends on B C
B depends on D E
C depends on F G`;
    let expectedOutput = `A depends on B C D E F G
B depends on D E
C depends on F G`;
    const dependencies = resolveDependencies(libraries);
    expect(normalize(dependencies)).to.equal(normalize(expectedOutput));
    done();
});

it('should handle dependencies with underscores', (done) => {
    let libraries = `A depends on B_C
B_C depends on D_E
D_E depends on F_G`;
    let expectedOutput = `A depends on B_C D_E F_G
B_C depends on D_E F_G
D_E depends on F_G`;
    const dependencies = resolveDependencies(libraries);
    expect(normalize(dependencies)).to.equal(normalize(expectedOutput));
    done();
});

it('should handle dependencies with numbers', (done) => {
    let libraries = `A1 depends on B2 C3
B2 depends on D4 E5
C3 depends on F6 G7`;
    let expectedOutput = `A1 depends on B2 C3 D4 E5 F6 G7
B2 depends on D4 E5
C3 depends on F6 G7`;
    const dependencies = resolveDependencies(libraries);
    expect(normalize(dependencies)).to.equal(normalize(expectedOutput));
    done();
});

it('should handle dependencies with mixed characters', (done) => {
    let libraries = `A1_2 depends on B3_4 C5_6
B3_4 depends on D7_8 E9_0
C5_6 depends on F1_2 G3_4`;
    let expectedOutput = `A1_2 depends on B3_4 C5_6 D7_8 E9_0 F1_2 G3_4
B3_4 depends on D7_8 E9_0
C5_6 depends on F1_2 G3_4`;
    const dependencies = resolveDependencies(libraries);
    expect(normalize(dependencies)).to.equal(normalize(expectedOutput));
    done();
});

it('should handle empty input', (done) => {
    let libraries = ``;
    let expectedOutput = ``;
    const dependencies = resolveDependencies(libraries);
    expect(normalize(dependencies)).to.equal(normalize(expectedOutput));
    done();
});

it('should handle dependencies with long names', (done) => {
    let libraries = `LibraryA depends on LibraryB LibraryC
LibraryB depends on LibraryD LibraryE
LibraryC depends on LibraryF LibraryG`;
    let expectedOutput = `LibraryA depends on LibraryB LibraryC LibraryD LibraryE LibraryF LibraryG
LibraryB depends on LibraryD LibraryE
LibraryC depends on LibraryF LibraryG`;
    const dependencies = resolveDependencies(libraries);
    expect(normalize(dependencies)).to.equal(normalize(expectedOutput));
    done();
});

it('should handle dependencies with underscore', (done) => {
    let libraries = `Lib_A depends on Lib_B Lib_C
Lib_B depends on Lib_D Lib_E
Lib_C depends on Lib_F Lib_G`;
    let expectedOutput = `Lib_A depends on Lib_B Lib_C Lib_D Lib_E Lib_F Lib_G
Lib_B depends on Lib_D Lib_E
Lib_C depends on Lib_F Lib_G`;
    const dependencies = resolveDependencies(libraries);
    expect(normalize(dependencies)).to.equal(normalize(expectedOutput));
    done();
});

it('should handle dependencies with mixed cases', (done) => {
    let libraries = `libA depends on libB libC
libB depends on libD libE
libC depends on libF libG`;
    let expectedOutput = `libA depends on libB libC libD libE libF libG
libB depends on libD libE
libC depends on libF libG`;
    const dependencies = resolveDependencies(libraries);
    expect(normalize(dependencies)).to.equal(normalize(expectedOutput));
    done();
});

it('should handle dependencies with circular dependency cases', (done) => {
    let libraries = `A depends on B E C
C depends on A Z
Z depends on `;
    let expectedOutput = `A depends on B C E Z
C depends on A B E Z
Z depends on `;
    const dependencies = resolveDependencies(libraries);
    expect(normalize(dependencies)).to.equal(normalize(expectedOutput));
    done();
});

it('should handle dependencies with multiple circular dependencies', (done) => {
    let libraries = `A depends on B C
B depends on D E
C depends on F G
D depends on A
E depends on C`;
    let expectedOutput = `A depends on B C D E F G
B depends on A C D E F G 
C depends on F G
D depends on A B C E F G
E depends on C F G`;
    const dependencies = resolveDependencies(libraries);
    expect(normalize(dependencies)).to.equal(normalize(expectedOutput));
    done();
});

it('should handle dependencies with nested circular dependencies', (done) => {
    let libraries = `A depends on B
B depends on C
C depends on D
D depends on A`;
    let expectedOutput = `A depends on B C D
B depends on A C D
C depends on A B D
D depends on A B C`;
    const dependencies = resolveDependencies(libraries);
    expect(normalize(dependencies)).to.equal(normalize(expectedOutput));
    done();
});

it('should handle dependencies with indirect circular dependencies', (done) => {
    let libraries = `A depends on B
B depends on C
C depends on D
D depends on B`;
    let expectedOutput = `A depends on B C D
B depends on C D
C depends on B D
D depends on B C`;
    const dependencies = resolveDependencies(libraries);
    expect(normalize(dependencies)).to.equal(normalize(expectedOutput));
    done();
});

it('should handle dependencies with self-referencing circular dependencies', (done) => {
    let libraries = `A depends on A B
B depends on C
C depends on D`;
    let expectedOutput = `A depends on B C D
B depends on C D
C depends on D`;
    const dependencies = resolveDependencies(libraries);
    expect(normalize(dependencies)).to.equal(normalize(expectedOutput));
    done();
});